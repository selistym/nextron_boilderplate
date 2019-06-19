// This is the flag for the column where the row grouping lives.
// We must use flags because ID messes up the row group
// TODO @Derek This is a shitty way of doing it, using a flag here. Lets put it in the MOBX UI store
// We should save the id of the last one and the first one.
export const FIRST_COL_FLAG = 'isFirstCol';
export const LAST_COL_FLAG = 'isLastCol';
// Classes are used purely for styling
export const LAST_COL_CLASS = 'col-last';

export const AUTO_GROUP_COL_DEF = {
  [FIRST_COL_FLAG]: true,
  showRowGroup: true,
  suppressMovable: true,
  pinned: 'left',
};

export const TYPE_RENDERER = {
  TEXT: { renderer: 'gridCellTextRenderer', editor: 'gridCellTextEditor' },
  NUMBER: { renderer: 'gridCellNumberRenderer', editor: 'gridCellNumberEditor' },
  DATETIME: { renderer: 'gridCellDateRenderer', editor: 'gridCellDateEditor' },
  SELECT: { renderer: 'gridCellSelectRenderer', editor: 'gridCellSelectEditor' },
  MULTI_SELECT: { renderer: 'gridCellMultiSelectRenderer', editor: 'gridCellMultiSelectEditor' },
  RECORD_REFERENCE: { renderer: 'gridCellReferenceRenderer', editor: 'gridCellReferenceEditor' },
  LOOKUP: { renderer: 'gridCellLookupRenderer', editor: null },
  MULTI_ATTACHMENT: { renderer: 'gridCellAttachmentRenderer', editor: 'gridCellAttachmentEditor' },
};

export const LAST_COL_PROPS = { [LAST_COL_FLAG]: true, cellClass: LAST_COL_CLASS };

export enum ValueSource {
  'Self',
  'Sub',
}

export enum LookupStatus {
  'IsLoading',
  'IsComplete',
}
