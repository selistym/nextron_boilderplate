import { createModel } from '@rematch/core';
import Router from 'next/router';

import { addAllIds, addAllIdsOptionToParent, addById } from '../shared/helper';
import { workspaceUpdatedSubscription } from '../shared/network';
import {
  adaptCoreAndTableViewOptions,
  adaptForeignTableColumns,
  adaptGridView,
  adaptListView,
  adaptTableRecord,
  adaptTableRecords,
  adaptTimelineGridView,
  adaptTimelineView,
  getActiveView,
  getDefaultTableId,
  getDefaultViewId,
} from './adapter';
import {
  handleCellUpdated,
  handleColumnAdded,
  handleListCellUpdated,
  handleListRowAdded,
  handleLookupUpdate,
  handleRowAdded,
  handleTableCreated,
  handleViewCreated,
} from './handler';
import { checkResponse } from './helper';
import {
  addColumnToCore,
  addRowToCore,
  addTableToCore,
  addViewToCore,
  getCore,
  getViews,
  updateCellInCore,
} from './network';

import { TIME_OPTIONS } from '@app/renderer/constants/timeline';
import { compareTopics } from '@app/renderer/lib/subscriptionTopic';

const initialState = {
  /** Top level states & data */
  activeIds: {
    workspaceId: '',
    coreId: '',
    tableId: '',
    viewId: '',
  },
  loading: {
    isLoadingCore: true,
    isLoadingView: true,
    isLoadingGrid: true,
  },
  activeCore: {
    tableOptionsAllIds: [],
  },
  // Also contains our viewOptionsAllIds list. Table options pertaining to a single core.
  tableOptions: { byId: {} },
  // viewOptions pertaining to all the tables within a single core.
  viewOptions: { byId: {} },

  /** View specific states & data */
  // Grid View, Timeline View, List View
  gridApi: {},
  initialColumns: [],
  initialRows: [],

  // Timeline View
  controls: {
    timeMeasure: TIME_OPTIONS.HOURS,
  },
  timelineColumns: [],
  subs: [],

  // List View
  columnsById: {},
};

export default createModel({
  state: initialState,
  reducers: {
    setIsLoading(state, payload) {
      return {
        ...state,
        loading: {
          ...state.loading,
          ...payload,
        },
      };
    },
    setActiveIds(state, payload) {
      return { ...state, activeIds: { ...state.activeIds, ...payload } };
    },
    setCoreAndTableViewOptions(state, payload) {
      return { ...state, ...payload };
    },
    setGrid(state, payload) {
      return { ...state, gridApi: payload };
    },
    setGridView(state, payload) {
      return { ...state, ...payload };
    },
    setListView(state, payload) {
      return { ...state, ...payload };
    },
    setControls(state, payload) {
      return {
        ...state,
        controls: {
          ...state.controls,
          ...payload,
        },
      };
    },
    resetInitialState() {
      return initialState;
    },

    /** subscription handlers */
    setSubs(state, payload) {
      return { ...state, subs: payload };
    },
    handleTableCreatedEvent(state, payload) {
      const newTableOption = handleTableCreated(state, payload);

      if (!newTableOption) return state;
      return {
        ...state,
        activeCore: addAllIds(state.activeCore, newTableOption, 'tableOptionsAllIds'),
        tableOptions: addById(state.tableOptions, newTableOption),
      };
    },
    handleViewCreatedEvent(state, payload) {
      const { tableId } = payload;
      const newOption = handleViewCreated(state, payload);
      if (!newOption) return state;

      const newTableOptions = addAllIdsOptionToParent(
        state,
        newOption,
        'viewOptionsAllIds',
        tableId,
        'tableOptions',
      );
      if (!newTableOptions) return state;

      return {
        ...state,
        tableOptions: newTableOptions,
        viewOptions: addById(state.viewOptions, newOption),
      };
    },
    // Kind of cheating but we don't need to update redux with ag-grid. But we need the updated state.
    handleColumnAddedEvent(state, payload) {
      handleColumnAdded(state, payload);
      return state;
    },
    handleRowAddedEvent(state, payload) {
      handleRowAdded(state, payload);
      return state;
    },
    handleListRowAddedEvent(state, payload) {
      handleListRowAdded(state, payload);
      return state;
    },
    handleCellUpdatedEvent(state, payload) {
      if (
        payload.action.type === 'HAS_UPDATE' ||
        (payload._metadata.source === 'SAGA' && payload.action.type === 'ADD_VALUE')
      ) {
        handleLookupUpdate(state.gridApi, payload);
      } else {
        handleCellUpdated(state, payload);
      }
      return state;
    },
    handleListCellUpdatedEvent(state, payload) {
      if (
        // Not implemented yet.
        payload.action.type === 'HAS_UPDATE' ||
        (payload._metadata.source === 'SAGA' && payload.action.type === 'ADD_VALUE')
      ) {
        // handleLookupUpdate(state.gridApi, payload);
      } else {
        handleListCellUpdated(state, payload);
      }
      return state;
    },
  },
  effects: {
    async getCoreAndView(payload, rootStore) {
      const { workspaceId, coreId, tableId, viewId } = payload;
      const { core } = rootStore;
      this.stopSubs();
      this.setActiveIds({ workspaceId, coreId });

      try {
        // If there are table options, it means the user is changing tables or changing views.
        if (core.activeCore.tableOptionsAllIds.length !== 0) {
          this.setIsLoading({ isLoadingView: true });
          await this.getAndAdaptView(payload);
        } else {
          // Take core overarching data and adapt
          const response = await getCore({ id: workspaceId }, { coreId }, true, false);
          checkResponse(response);
          const adaptedCore = adaptCoreAndTableViewOptions(response);
          this.setCoreAndTableViewOptions(adaptedCore);
          this.setIsLoading({ isLoadingCore: false });

          const activeTableId = getDefaultTableId(response, tableId);
          // Getting view Id and setting it to activeIds
          const activeViewId = getDefaultViewId(
            response,
            workspaceId,
            coreId,
            activeTableId as string,
            viewId,
          );
          // Adapting the view data
          await this.getAndAdaptView({
            ...payload,
            tableId: activeTableId,
            viewId: activeViewId,
          });
        }
      } catch (err) {
        // tslint:disable-next-line: no-console
        console.warn('Error: ', err);
      }
    },
    /**
     * These getViews need to be changed to just getView by passing in a viewId
     */
    async getTableRecords(payload) {
      const { workspaceId, coreId, tableId, selectedRowIds, filterSelectedRowIds } = payload;
      const { workspace } = await getViews({ id: workspaceId }, coreId, tableId);
      return adaptTableRecords(workspace, selectedRowIds, filterSelectedRowIds);
    },
    async getTableRecord(payload) {
      const { workspaceId, coreId, tableId, rowId } = payload;
      const { workspace } = await getViews({ id: workspaceId }, coreId, tableId);
      return adaptTableRecord(workspace, rowId);
    },
    async getForeignTableColumns(payload, rootState) {
      const {
        core: { activeIds },
      } = rootState;
      const { workspaceId, coreId } = activeIds;
      const { foreignTableId } = payload;
      const { workspace } = await getViews({ id: workspaceId }, coreId, foreignTableId);
      return adaptForeignTableColumns(workspace);
    },
    async addTable(_, rootStore) {
      const {
        core: { activeCore, activeIds },
      } = rootStore;
      const tableName = `Table ${activeCore.tableOptionsAllIds.length + 1}`;
      const addTableInput: any = {
        tableName,
        coreId: activeIds.coreId,
        workspaceId: activeIds.workspaceId,
      };
      await addTableToCore(addTableInput);
    },
    async addView(payload, rootStore) {
      const {
        core: {
          activeIds: { workspaceId, coreId, tableId },
        },
      } = rootStore;

      const addViewInput: any = {
        workspaceId,
        coreId,
        tableId,
        view: payload,
      };

      await addViewToCore(addViewInput);
      /**
       * Should redirect user to new view afterwards;
       */
    },

    /** View Controls */
    changeTimeMeasure(measure, rootState) {
      const {
        core: { gridApi, controls },
      } = rootState;
      if (controls.timeMeasure === measure) return;

      const rows = gridApi.getAllRows();
      // TODO Derek Refactor this.
      const columns = gridApi
        .getAllGridColumns()
        .filter(
          (c) =>
            c.colDef.headerClass !== 'header-timeline' &&
            c.colId !== 'colIndexGhost' &&
            c.colDef.field !== 'ghost-column',
        )
        .map((c) => c.colDef);
      this.adaptAndSetTimelineView({ rows, columns, measure, createCols: false });
    },

    /** Grid API */
    /**
     * For addColumn, addRow requests, we are sending to backend and relying on subscriptions
     * to reply and update the local store.
     */
    async gridAddColumn(payload, rootStore) {
      const { name, type, typeOptions } = payload;
      let adaptedTypeOptions = typeOptions;
      if (type === 'MULTI_SELECT' || type === 'SELECT') {
        adaptedTypeOptions = { choices: Object.values(typeOptions.choices) };
      }
      const {
        core: { activeIds },
      } = rootStore;

      await addColumnToCore({
        workspaceId: activeIds.workspaceId,
        coreId: activeIds.coreId,
        tableId: activeIds.tableId,
        columnConfig: {
          name,
          type,
          ...adaptedTypeOptions,
        },
      });
    },
    async addRowAtIndex(_, rootStore) {
      const {
        core: { activeIds },
      } = rootStore;
      return addRowToCore({
        workspaceId: activeIds.workspaceId,
        coreId: activeIds.coreId,
        tableId: activeIds.tableId,
      });
    },
    async updateCell(payload, rootStore) {
      const {
        core: { activeIds },
      } = rootStore;

      updateCellInCore({
        ...payload,
        workspaceId: activeIds.workspaceId,
        coreId: activeIds.coreId,
        tableId: activeIds.tableId,
      });
    },

    /** subscription initiation */
    // *Warning* be careful in using rootStore here because subscription will take the rootStore at that certain time.
    // We need to split this up depending on the view!!!
    initiateSubscription({ workspaceId, viewType }) {
      const subscription = workspaceUpdatedSubscription({ workspaceId });
      let subs;

      if (viewType === 'GRID' || viewType === 'TIMELINE') {
        const columnAddedSub = subscription
          .filter((payload: any) => compareTopics(payload.eventName, '#.ColumnAddedToView'))
          .subscribe(this.handleColumnAddedEvent);

        const rowAddedSub = subscription
          .filter((payload: any) => compareTopics(payload.eventName, '#.RowAddedToView'))
          .subscribe(this.handleRowAddedEvent);

        // Could probably refactor with rxjs
        const cellUpdatedSub = subscription
          .filter((payload: any) => compareTopics(payload.eventName, '#.CellUpdated'))
          .subscribe(this.handleCellUpdatedEvent);

        const tableCreatedSub = subscription
          .filter((payload: any) => compareTopics(payload.eventName, '#.TableCreated'))
          .subscribe(this.handleTableCreatedEvent);

        const viewCreatedSub = subscription
          .filter((payload: any) => compareTopics(payload.eventName, '#.ViewAdded'))
          .subscribe(this.handleViewCreatedEvent);

        const logSub = subscription.subscribe((payload) => {
          // tslint:disable-next-line: no-console
          console.log(payload.eventName);
        });

        subs = [
          columnAddedSub,
          rowAddedSub,
          cellUpdatedSub,
          tableCreatedSub,
          viewCreatedSub,
          logSub,
        ];
      } else {
        const columnAddedSub = subscription
          .filter((payload: any) => compareTopics(payload.eventName, '#.ColumnAddedToView'))
          .subscribe(this.handleColumnAddedEvent);

        const rowAddedSub = subscription
          .filter((payload: any) => compareTopics(payload.eventName, '#.RowAddedToView'))
          .subscribe(this.handleListRowAddedEvent);

        // Could probably refactor with rxjs
        const cellUpdatedSub = subscription
          .filter((payload: any) => compareTopics(payload.eventName, '#.CellUpdated'))
          .subscribe(this.handleListCellUpdatedEvent);

        const tableCreatedSub = subscription
          .filter((payload: any) => compareTopics(payload.eventName, '#.TableCreated'))
          .subscribe(this.handleTableCreatedEvent);

        const viewCreatedSub = subscription
          .filter((payload: any) => compareTopics(payload.eventName, '#.ViewAdded'))
          .subscribe(this.handleViewCreatedEvent);

        const logSub = subscription.subscribe((payload) => {
          // tslint:disable-next-line: no-console
          console.log(payload.eventName);
        });

        subs = [
          columnAddedSub,
          rowAddedSub,
          cellUpdatedSub,
          tableCreatedSub,
          viewCreatedSub,
          logSub,
        ];
      }

      this.setSubs(subs);
    },
    resetStateAndStopSubs(_, rootState) {
      rootState.core.subs.forEach((sub) => sub.unsubscribe());
      this.resetInitialState();
    },
    stopSubs(_, rootState) {
      rootState.core.subs.forEach((sub) => sub.unsubscribe());
    },

    /** helper effects */
    async getAndAdaptView({ workspaceId, coreId, tableId, viewId }, rootStore) {
      /**
       * We need to check for tableId and viewId. If for any reason both do not exist, it will be weird because
       * we either are getting the default ones (which means the data has no table or view) or the user is
       * switching views and tables and theres no viewId for some reason.
       */
      if (!tableId) Router.push('/no-table-id-exists');
      if (!viewId) Router.push(`/core/${workspaceId}/${coreId}/${tableId}`);

      this.setActiveIds({ tableId, viewId });

      const viewType = rootStore.core.viewOptions.byId[viewId];
      this.initiateSubscription({ workspaceId, viewType: viewType.type });

      try {
        const response = await getCore(
          { id: workspaceId },
          { coreId, tableId, viewId },
          false,
          true,
        );
        checkResponse(response);
        this.adaptAndSetView({ response, viewId });
        this.setIsLoading({ isLoadingView: false });
      } catch (err) {
        // tslint:disable-next-line: no-console
        console.warn('Error: ', err);
      }
    },
    adaptAndSetView(payload) {
      const { response } = payload;
      const activeView = getActiveView(response);
      if (!activeView) throw new Error('Error: No active view available');

      if (activeView.type === 'GRID') {
        const adaptedGridView = adaptGridView(activeView);
        this.setGridView(adaptedGridView);
      } else if (activeView.type === 'TIMELINE') {
        const { initialRows, initialColumns } = adaptTimelineGridView(activeView);
        this.adaptAndSetTimelineView({
          columns: initialColumns,
          rows: initialRows,
          createCols: true,
          measure: 'hours',
        });
      } else if (activeView.type === 'LIST') {
        const adaptedListView = adaptListView(activeView);
        this.setListView(adaptedListView);
      }
    },
    adaptAndSetTimelineView({ columns, rows, createCols, measure }) {
      // Hacky shit is truly hacky. We should be able to get startDate and endDate from view meta.
      const { startDate, endDate } = getFakeStartAndEndDates(columns);
      this.hackyShit({ startDate, endDate, createCols });
      const adaptedTimeline = adaptTimelineView(columns, rows, measure, startDate, endDate);
      this.setControls({ timeMeasure: measure });
      this.setGridView(adaptedTimeline);
    },
    hackyShit({ startDate, endDate, createCols }, rootStore) {
      if (createCols && (!startDate || !endDate)) {
        // tslint:disable-next-line: no-console
        console.warn('No start_date or end_date detected! Please refresh, we just created it.');
        /**
         *  Create fake columns by calling it twice, but we have to refresh the page
         */
        const {
          core: { activeIds },
        } = rootStore;
        addColumnToCore({
          workspaceId: activeIds.workspaceId,
          coreId: activeIds.coreId,
          tableId: activeIds.tableId,
          columnConfig: {
            type: 'DATETIME',
            name: 'start_date',
            dateFormat: 'FRIENDLY',
            includeTime: true,
            timeFormat: 'TWELVE_HOUR',
            useGMT: false,
          },
        });
        addColumnToCore({
          workspaceId: activeIds.workspaceId,
          coreId: activeIds.coreId,
          tableId: activeIds.tableId,
          columnConfig: {
            type: 'DATETIME',
            name: 'end_date',
            dateFormat: 'FRIENDLY',
            includeTime: true,
            timeFormat: 'TWOFOUR_HOUR',
            useGMT: false,
          },
        });
      }

      return { startDate, endDate };
    },
  },
});

/** fake shit to delete */
const getFakeStartAndEndDates = (cols) => {
  let startDate;
  let endDate;
  cols.forEach((col) => {
    if (col.headerName === 'start_date') {
      startDate = col.field;
    }
    if (col.headerName === 'end_date') {
      endDate = col.field;
    }
  });

  return { startDate, endDate };
};
