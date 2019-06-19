import Router from 'next/router';

import { getByIdAndAllIds } from '../../shared/helper';

import { FIELD_TYPES } from '@app/renderer/constants/fieldTypes';
import { ValueSource } from '@app/renderer/constants/grid';
import { ICellContent } from '../types';
import { adaptColumn, addGhostColumn, addIndexColumn, pinFirstColumn } from './grid';
import { adaptListRow, configureListColumns } from './list';
import { getFlattenedLookupValue } from './lookup';
import { adaptRecord } from './record';
import { configureTimeColumns, transformRowDataAndGetTimelineMeta } from './timeline';

import { TIME_OPTIONS } from '@app/renderer/constants/timeline';

import {
  GetCoreQuery,
  GetCoreQuery_workspace_cores_tableOptions,
  GetCoreQuery_workspace_cores_tables_views,
  GetCoreQuery_workspace_cores_tables_views_rows,
} from '@app/renderer/graphql/core/types/GetCoreQuery';
import { arrayToObject } from '@app/renderer/utils';

export const adaptCoreAndTableViewOptions = ({ workspace: { cores } }: GetCoreQuery) => {
  // tslint:disable-next-line: no-console
  if (!cores) return Router.push('/core-not-found');
  const core = cores[0];
  const activeCore: any = { color: core.color, icon: core.icon, id: core.id, name: core.name };
  const { tableOptionsById, tableOptionsAllIds, viewOptionsById } = adaptTableOptions(
    core.tableOptions,
  );

  activeCore.tableOptionsAllIds = tableOptionsAllIds;
  return {
    activeCore,
    tableOptions: { byId: tableOptionsById },
    viewOptions: { byId: viewOptionsById },
  };
};

/**
 * @param tableId
 */
export const getDefaultTableId = (
  { workspace: { cores } }: GetCoreQuery,
  tableId: string | undefined,
) => {
  // tslint:disable-next-line: no-console
  if (!cores) return Router.push('/core-not-found');
  if (!cores[0].tableOptions) return Router.push('/table-not-found');
  const checkIfTableIdExists = !!(tableId && cores[0].tableOptions.find((t) => t.id === tableId));

  return checkIfTableIdExists ? tableId : cores[0].tableOptions[0].id;
};

/**
 * This will also help us validate if the viewId is correct (if it is passed in).
 * If it doesn't exist, we will grab the first id;
 * This also helps us do the shallow redirect if the viewId is wrong or not present
 * @param viewId
 */
export const getDefaultViewId = (
  { workspace: { cores } }: GetCoreQuery,
  workspaceId: string,
  coreId: string,
  tableId: string,
  viewId: string | undefined,
) => {
  // Already has an active id
  const tableOption = cores[0].tableOptions.find((t) => t.id === tableId);

  // tslint:disable-next-line: no-console
  if (!tableOption || !tableOption.viewOptions) return console.warn('No tableOption or view found');
  const checkIfViewIdExists = !!(viewId && tableOption.viewOptions.find((v) => v.id === viewId));
  const finalViewId = checkIfViewIdExists ? viewId : tableOption.viewOptions[0].id;

  // Optimistically change route no matter route. This is just in case tableId or viewId is incorrect
  const newRoute = `/core/${workspaceId}/${coreId}/${tableId}/${finalViewId}`;
  Router.replace('/core', newRoute, { shallow: true });
  return finalViewId;
};

/**
 * The response should be filtered down all the way to the view level by now. So we can just grab
 * the first of everything.
 */
export const getActiveView = ({ workspace: { cores } }: GetCoreQuery) => {
  // tslint:disable-next-line: no-console
  if (!cores) return console.warn('There are no cores available');
  const core = cores[0];

  // tslint:disable-next-line: no-console
  if (!core.tables) return console.warn('There are no tables available');
  const table = core.tables[0];

  // tslint:disable-next-line: no-console
  if (!table.views) return console.warn('There are no views available');
  return table.views[0];
};

/**
 * TODO: @Will Refactor
 * 1. filter rows whose id contains in selectedRowIds
 * 2. map rows and get three things: rowId; title(the first column value of row); cells(all columns data of one row)
 * 3. use lodash get to refactor
 */
export const adaptTableRecords = (
  workspace: GetCoreQuery,
  selectedRowIds: string[],
  filterSelectedRowIds?: boolean,
) => {
  if (workspace && workspace.cores && workspace.cores[0].tables) {
    const table = workspace.cores[0].tables[0];
    if (table && table.views) {
      const tableData = table.views[0];
      if (tableData) {
        const { columns, rows } = tableData;

        // filterRows
        const filteredRows = selectedRowIds
          ? rows.filter((row: any) => {
              const index = selectedRowIds.findIndex((rowId: string) => row!.id === rowId);
              if (filterSelectedRowIds) {
                return index === -1;
              }
              return index !== -1;
            })
          : rows;

        // get records data
        return filteredRows.map((row: any) => adaptRecord(row, columns));
      }
    }
  }
  return [];
};

export const adaptTableRecord = (workspace: GetCoreQuery, rowId: string) => {
  if (workspace && workspace.cores && workspace.cores[0].tables) {
    const table = workspace.cores[0].tables[0];
    if (table && table.views) {
      const tableData = table.views[0];
      if (tableData) {
        const { columns, rows } = tableData;

        // find the row
        const row = rows.find((item: any) => item!.id === rowId);
        if (row) {
          return adaptRecord(row, columns);
        }
      }
    }
  }
  return null;
};

export const adaptForeignTableColumns = (workspace: GetCoreQuery) => {
  if (workspace && workspace.cores && workspace.cores[0].tables) {
    const table = workspace.cores[0].tables[0];
    if (table && table.views) {
      const tableData = table.views[0];
      if (tableData) {
        const { columns } = tableData;
        return columns.map((column) => ({
          name: column.name,
          nameId: column.name,
          value: column.id,
        }));
      }
    }
  }
  return [];
};

export const configureColumns = (columns) =>
  [addIndexColumn()].concat(pinFirstColumn(columns)).concat([addGhostColumn()]);

/** Grid */
export const adaptGridView = (view: GetCoreQuery_workspace_cores_tables_views) => {
  const initialColumns = configureColumns(view.columns.map((col) => adaptColumn(col)));
  const initialRows = view.rows.map(adaptRowToIncludeSource);
  return { initialColumns, initialRows };
};

/** List */
export const adaptListView = (view: GetCoreQuery_workspace_cores_tables_views) => {
  const initialColumns = configureListColumns();
  const columnsById = arrayToObject(view.columns, 'id');
  // PUTTING COLUMNSBYID INSIDE THE CELL IS NOT IDEAL, FIND A WAY TO USE GLOBAL STORE
  const initialRows = view.rows.map((row) => adaptListRow(row, columnsById));
  return { initialColumns, initialRows, columnsById };
};

/** Timeline */
/**
 * This is purely to get the grid portion of the timeline. It differers from the grid view because of
 * 1. Everything is pinned left,
 * 2. We hide columns except for the first two (or what the user sets which will be implemented later).
 * 3. do not configure the columns until later, so we will not do it here.
 */
export const adaptTimelineGridView = (view: GetCoreQuery_workspace_cores_tables_views) => {
  const initialColumns = view.columns.map((col, idx: number) => adaptColumn(col, idx, true));
  const initialRows = view.rows.map(adaptRowToIncludeSource);

  return { initialColumns, initialRows };
};

export const adaptTimelineView = (
  cols: any,
  rows: any,
  timeMeasure = TIME_OPTIONS.HOURS,
  startId?: string,
  endId?: string,
) => {
  if (!startId || !endId) return null;
  const rowDataAndMeta = transformRowDataAndGetTimelineMeta(rows, timeMeasure, startId, endId);
  return {
    initialColumns: configureColumns(
      configureTimeColumns(
        cols,
        rowDataAndMeta.minDateTime,
        rowDataAndMeta.maxDateTime,
        timeMeasure,
      ),
    ),
    initialRows: rowDataAndMeta.formattedRowData,
  };
};

/*** Helpers */
/**
 * Need to loop through tableOptions and viewOptions to get the table byId, allIds, and views byId
 * @param tableOptions
 */
const adaptTableOptions = (tableOptions: GetCoreQuery_workspace_cores_tableOptions[] | null) => {
  let tableIdx = 0;
  const tableOptionsById: { [key: string]: any } = {};
  const tableOptionsAllIds: string[] = [];
  let viewOptionsById: { [key: string]: any } = {};

  if (!tableOptions) {
    // tslint:disable-next-line: no-console
    Router.push('/table-is-not-found');
  } else {
    for (tableIdx; tableIdx < tableOptions.length; tableIdx = tableIdx + 1) {
      const table = tableOptions[tableIdx];
      const { byId, allIds } = getByIdAndAllIds(table.viewOptions);

      tableOptionsById[table.id] = { id: table.id, name: table.name, viewOptionsAllIds: allIds };
      tableOptionsAllIds.push(table.id);
      viewOptionsById = { ...viewOptionsById, ...byId };
    }
  }

  return { tableOptionsById, tableOptionsAllIds, viewOptionsById };
};

/**
 * We only need to adapt row to include the source IF we need to prevent a subscription mutation loop.
 * ex. in the grid, a subscription can tell us to update, and a mutation will auto occur.
 */
export const adaptRowToIncludeSource = (row: GetCoreQuery_workspace_cores_tables_views_rows) => {
  const rowData: any = { id: row.id };

  if (row.cells) {
    row.cells.forEach((cell) => {
      rowData[cell.columnId] = adaptCellToIncludeSource(cell);
    });
  }
  return rowData;
};

export const adaptCellToIncludeSource = (cell: any) => {
  const value: ICellContent = {
    content: cell[FIELD_TYPES[cell.type].valueKey],
    source: ValueSource.Self,
    type: cell.type,
    columnId: cell.columnId,
  };
  value.content = cell[FIELD_TYPES[cell.type].valueKey];

  if (cell.type === 'MULTI_SELECT' || cell.type === 'SELECT' || cell.type === 'MULTI_ATTACHMENT') {
    value.content = value.content && JSON.parse(value.content as string);
  }
  if (cell.type === 'LOOKUP') {
    // Now, we can not use `getLookupValue`, because lookup typeOptions do not have resultType
    value.content = getFlattenedLookupValue(value.content);
  }

  return value;
};
