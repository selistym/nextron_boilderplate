export interface ICellPosition {
  columnIndex: number;
  rowIndex: number;
}

export interface ICellDataId {
  columnId: string;
  rowId: string;
}

export interface IInitilizeTablesParams {
  tableId: string;
  coreId: string;
  workspaceId: string;
  viewId: string;
}
