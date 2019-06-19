import { TYPE_RENDERER } from '@app/constants/grid';

import { GetCoreAndViewQuery_workspace_cores_tables_views_columns } from '@app/graphql/core/types/GetCoreAndViewQuery';

/**
 * Also includes some timeline code. We are adding pinned, and hidden to the columns.
 */
export const adaptColumn = (
  col: GetCoreAndViewQuery_workspace_cores_tables_views_columns,
  idx?: number,
  isTimeline?: boolean,
) => {
  const typeCell = TYPE_RENDERER[col.type];
  const column = {
    headerName: col.name,
    field: col.id,
    colId: col.id,
    editable: col.type !== 'LOOKUP',
    cellEditor: typeCell && typeCell.editor,
    cellRendererSelector: (props) => {
      if (props.node.footer) return { component: 'groupCellFooter', params: { props } };
      if (props.node.group) return { component: 'groupCellHeader', params: { props } };

      return { component: typeCell && typeCell.renderer };
    },
    typeOptions: { type: col.type, ...col.typeOptions },
  };

  if (isTimeline) column.pinned = 'left';
  if (isTimeline && idx && idx >= 1) column.hide = true;

  return column;
};

/* Grid configuration for AG-grid */
export const pinFirstColumn = (columns) => {
  const first = columns[0];
  const pinned = { ...first, pinned: 'left', suppressMovable: true };
  return [pinned].concat(columns.slice(1));
};

export const addIndexColumn = () => ({
  checkboxSelection: true,
  colId: 'colIndexGhost',
  cellClass: 'no-focus col-index-ghost',
  cellRenderer: 'groupCellLeftRenderer',
  headerComponent: null,
  editable: false,
  field: '',
  lockPinned: true,
  lockPosition: true,
  pinned: 'left',
  suppressNavigable: true,
  suppressMovable: true,
  suppressSizeToFit: true,
  suppressMenu: true,
  rowDrag: true,
  width: 80,
  valueGetter: 'node.rowIndex',
});

export const addGhostColumn = (i) => ({
  cellRenderer: 'groupCellRightRenderer',
  cellClass: 'no-focus col-last-ghost',
  field: 'ghost-column',
  editable: false,
  headerComponent: 'addColumn',
  headerName: '',
  width: 200,
  suppressNavigable: true,
  suppressMovable: true,
  suppressSizeToFit: true,
  resizable: false,
});
