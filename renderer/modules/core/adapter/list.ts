import { adaptCellToIncludeSource } from '../adapter';

export const configureListColumns = () => {
  return [addIndexColumn()].concat({
    colId: 'listContent',
    field: 'listContent',
    cellClass: 'col-list-body',
    cellRenderer: 'listCellRenderer',
    headerComponent: null,
    editable: false,
    suppressNavigable: false,
    suppressMovable: true,
    suppressSizeToFit: true,
    suppressMenu: true,
    rowDrag: false,
  });
};

export const addIndexColumn = () => ({
  checkboxSelection: true,
  colId: 'colIndexGhost',
  cellClass: 'no-focus col-index-ghost',
  cellRenderer: 'groupCellLeftRenderer',
  headerComponent: null,
  editable: false,
  suppressNavigable: true,
  suppressMovable: true,
  suppressSizeToFit: true,
  suppressMenu: true,
  rowDrag: true,
  width: 60,
  valueGetter: 'node.rowIndex',
});

/**
 * Needs columns to find the primary column, lets cut it to 5 for now
 * I think cells are not in order so we need to change this.
 */
export const adaptListRow = (row, columnsById) => {
  const cells = row.cells || [];
  // This will be deprecated after we have hide columns
  const cellsToShow = cells.slice(0, 7);
  return {
    id: row.id,
    listContent: { columnsById, rows: cellsToShow.map(adaptCellToIncludeSource) },
  };
};
