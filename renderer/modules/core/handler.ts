import { get } from 'lodash';

import { TYPE_RENDERER, ValueSource } from '@app/constants/grid';
import { configureColumns } from './adapter';
import {
  convertPayloadIntoPresent,
  updateLocalCell,
  updateLocalListCell,
  updateMultipleCells,
} from './helper';
import { getCellWithDepth } from './network';

export const handleTableCreated = (coreState, payload: any) => {
  const { coreId, tableId, tableName } = payload;
  const { activeIds, tableOptions } = coreState;

  if (activeIds.coreId !== coreId) return null;
  if (tableOptions[tableId]) return null;

  const newTableOption = {
    name: tableName,
    id: tableId,
    viewOptionsAllIds: [],
  };

  return newTableOption;
};

export const handleViewCreated = (coreState, payload: any) => {
  const { tableId, viewId, view } = payload;
  const { tableOptions } = coreState;
  const viewOptions = get(tableOptions, `byId.${tableId}.viewOptionsAllIds`);
  if (!viewOptions || viewOptions.indexOf(viewId) !== -1) return null;

  return {
    ...view,
    id: viewId,
  };
};

/**
 * AG-Grid handlers do not need interaction with redux, we can put it in this file.
 */
export const handleColumnAdded = (coreState, payload: any) => {
  if (payload.tableId !== coreState.activeIds.tableId) return;
  const col = coreState.gridApi.getColumn(payload.columnId);
  // Column already exists, do not make changes.
  if (col) return;

  const oldColumns = coreState.gridApi.getAllGridColumns();
  const oldColumnDefs = oldColumns.slice(1, oldColumns.length - 1).map((c) => c.colDef);
  const typeCell = TYPE_RENDERER[payload.columnConfig.type];

  coreState.gridApi.setColumnDefs(
    configureColumns(
      oldColumnDefs.concat([
        {
          headerName: payload.columnConfig.name,
          field: payload.columnId,
          colId: payload.columnId,
          cellRenderer: typeCell.renderer,
          cellEditor: typeCell.editor,
          typeOptions: payload.columnConfig,
        },
      ]),
    ),
  );
};

export const handleRowAdded = (coreState, payload: any) => {
  if (payload.tableId !== coreState.activeIds.tableId) return;
  const row = coreState.gridApi.getRowNode(payload.rowId);
  // Row already exists, do not create a new one.
  if (row) return;

  coreState.gridApi.updateRowData({ add: [{ id: payload.rowId }], addIndex: -1 });
};

export const handleCellUpdated = (coreState, payload: any) => {
  if (payload.tableId !== coreState.activeIds.tableId) return;
  updateLocalCell(payload, coreState.gridApi.getRowNode, ValueSource.Sub);
};

export const handleLookupUpdate = async ({ getRowNode, updateRowData }, payload) => {
  const present = convertPayloadIntoPresent(payload);
  // This helps up update the cell to "Loading...", looks janky so lets turn it off for now.
  // updateMultipleCells(updateRowData, getRowNode, present);

  // Get new updates from backend
  try {
    // We need to implement schema stitching after.
    const data = await getCellWithDepth(payload.rowId, payload.columnId, 3);
    // Assume data is for one item for now.
    updateMultipleCells(updateRowData, getRowNode, present, data);
  } catch (err) {
    // tslint:disable-next-line: no-console
    console.log('Error time: ', err);
  }
};

/** List stuff */
export const handleListRowAdded = (coreState, payload: any) => {
  if (payload.tableId !== coreState.activeIds.tableId) return;
  const row = coreState.gridApi.getRowNode(payload.rowId);
  // Row already exists, do not create a new one.
  if (row) return;

  coreState.gridApi.updateRowData({
    add: [{ id: payload.rowId, listContent: { columnsById: coreState.columnsById, rows: [] } }],
    addIndex: -1,
  });
};

export const handleListCellUpdated = (coreState, payload: any) => {
  if (payload.tableId !== coreState.activeIds.tableId) return;
  updateLocalListCell(payload, coreState.gridApi.getRowNode, ValueSource.Sub);
};
