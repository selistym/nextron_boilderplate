import { createModel } from '@rematch/core';

import { addRowToCore, getCore, updateCellInCore, updateMultipleRowCells } from '../core/network';
import { addByIdAndAllIds, getByIdAndAllIds, waitForCellChange } from '../shared/helper';
import { adaptTreelabRows } from './adapter';

import {
  checkResponse,
  prepareAddRecordRef,
  prepareSetMultiSelect,
  prepareSetText,
} from '../core/helper';
import { AVAILABLE_BUDS, BudType } from './constants';

export default createModel({
  state: {
    loading: {
      isLoading: true,
      isLoadingAdd: false, // We could make this an object and load by ID
    },
    isDrawerOpen: false,
    budInstanceRows: {
      byId: {},
      allIds: [],
    },
  },
  reducers: {
    setIsDrawerOpen(state, payload) {
      return { ...state, isDrawerOpen: payload };
    },
    setIsLoading(state, payload) {
      return { ...state, loading: { ...state.loading, ...payload } };
    },
    addBud(state, payload) {
      return { ...state, budInstanceRows: addByIdAndAllIds(state.budInstanceRows, payload) };
    },
    addAllBuds(state, payload) {
      return { ...state, budInstanceRows: getByIdAndAllIds(payload) };
    },
  },
  effects: {
    async getCoreBuds(_, { core }) {
      // Grab all the bud instances from the treelab db
      const { budInstance } = AVAILABLE_BUDS[BudType.EXTRACTION];
      const budInstanceRows = await getFilteredRows(budInstance, {
        filterColumnId: budInstance.column.coreId,
        filterKey: 'text',
        filterValue: core.activeIds.coreId,
      });

      // Finally, adapt the data so it fits our UI
      const adaptedBudInstances = adaptTreelabRows(budInstanceRows, BudType.EXTRACTION);
      this.addAllBuds(adaptedBudInstances);
      this.setIsLoading({ isLoading: false });
    },
    async addBudToCore({ budInstance }, rootState) {
      const {
        core: { activeIds },
      } = rootState;
      const { workspaceId, coreId, column, tableId } = budInstance;
      // Helper so we don't have to write it twice.
      const updateCellInBud = async (columnId: string, value: string) => {
        await updateCellInCore({
          workspaceId,
          coreId,
          tableId,
          columnId,
          rowId: newRowId,
          action: { type: 'SET_VALUE', value: { type: 'TEXT', text: value } },
        });
      };
      this.setIsLoading({ isLoadingAdd: true });

      // 1. Create the row in the view / table.
      const { id: newRowId } = await addRowToCore({ workspaceId, coreId, tableId });
      // 2. Start a new subscription stream to find out when the bud instance id is created in the row.
      waitForCellChange({
        workspaceId,
        rowId: newRowId,
        columnId: column.budInstanceId,
        callback: (load: any) => {
          // 5. Completion callback should receive the new bud instance id.
          const budInstanceId = load.action.value.text;
          this.addBud({
            id: budInstanceId,
            type: BudType.EXTRACTION,
            name: 'My Extraction',
          });
          this.setIsLoading({ isLoadingAdd: false });
        },
      });
      // 3. Add workspaceId to new row.
      await updateCellInBud(column.workspaceId, activeIds.workspaceId);
      // 4. Add coreId to new row.
      await updateCellInBud(column.coreId, activeIds.coreId);
      // 5. Add a name to the instance.
      await updateCellInBud(column.name, 'My Extraction');
    },
    async submitBudInstance({ values, meta }) {
      const { instance } = AVAILABLE_BUDS[BudType.EXTRACTION];
      // First create a new row
      const tableMetaToSend = {
        workspaceId: instance.workspaceId,
        coreId: instance.coreId,
        tableId: instance.tableId,
      };
      const { id: rowId } = await addRowToCore(tableMetaToSend);

      // Build the new updates
      const updates = [];
      updates.push({
        rowId,
        columnId: instance.column.rules,
        action: prepareAddRecordRef(values.extractionRuleSet),
      });
      updates.push({
        rowId,
        columnId: instance.column.attachment,
        action: prepareSetMultiSelect(values.extractionFile),
      });
      updates.push({
        rowId,
        columnId: instance.column.budInstance,
        action: prepareAddRecordRef(meta.budInstance),
      });
      updates.push({
        rowId,
        columnId: instance.column.active,
        action: prepareSetText('yes'),
      });

      await updateMultipleRowCells(updates, tableMetaToSend);
    },
  },
});

/** Helpers */
const getFilteredRows = async (
  { workspaceId, coreId, tableId },
  { filterColumnId, filterKey, filterValue },
) => {
  const response = await getCore({ id: workspaceId }, { coreId, tableId }, false, true);
  checkResponse(response);
  // Filter the ones pertaining to us
  const filteredResponse = response.workspace.cores[0].tables[0].views[0].rows.filter((row) => {
    const cell = findCellValue(row.cells, filterColumnId);
    if (!cell || cell[filterKey] !== filterValue) return null;
    return true;
  });

  return filteredResponse;
};

const findCellValue = (cells, key) => cells && cells.find((c) => c.columnId === key);
