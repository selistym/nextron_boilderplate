// Matching backend type to renderer lives in constants/grid

import './styles.css';

import AddColumn from '../AddColumn';
import HeaderCell from '../HeaderCell';

import AddRowRenderer from './AddRow';
import { GridCellAttachmentEditor, GridCellAttachmentRenderer } from './Attachment';
import { GridCellCheckboxEditor, GridCellCheckboxRenderer } from './Checkbox';
import { GridCellDateEditor, GridCellDateRenderer } from './Date';
import {
  GroupCellFooter,
  GroupCellHeader,
  GroupCellLeftRenderer,
  GroupCellRightRenderer,
} from './Group';
import ListCellRenderer from './List';
import GridCellLookupRenderer from './Lookup';
import { GridCellMultilineTextEditor, GridCellMultilineTextRenderer } from './MultilineText';
import { GridCellMultiSelectEditor, GridCellMultiSelectRenderer } from './MultiSelect';
import { GridCellNumberEditor, GridCellNumberRenderer } from './Number';
import { GridCellReferenceEditor, GridCellReferenceRenderer } from './Reference';
import { GridCellSelectEditor, GridCellSelectRenderer } from './SingleSelect';
import { GridCellTextEditor, GridCellTextRenderer } from './Text';
import TimelineCellRenderer from './Timeline';

export const EDITOR_MAP = {
  groupCellLeftRenderer: GroupCellLeftRenderer,
  groupCellRightRenderer: GroupCellRightRenderer,
  timelineCellRenderer: TimelineCellRenderer,
  gridCellTextEditor: GridCellTextEditor,
  gridCellNumberEditor: GridCellNumberEditor,
  gridCellMultilineTextRenderer: GridCellMultilineTextRenderer,
  gridCellMultilineTextEditor: GridCellMultilineTextEditor,
  gridCellMultiSelectEditor: GridCellMultiSelectEditor,
  gridCellAttachmentEditor: GridCellAttachmentEditor,
  gridCellSelectEditor: GridCellSelectEditor,
  gridCellDateEditor: GridCellDateEditor,
  gridCellReferenceEditor: GridCellReferenceEditor,
  gridCellCheckboxRenderer: GridCellCheckboxRenderer,
  gridCellCheckboxEditor: GridCellCheckboxEditor,
  groupCellFooter: GroupCellFooter,
  groupCellHeader: GroupCellHeader,
  listCellRenderer: ListCellRenderer,
  addRowRenderer: AddRowRenderer,
};

export const RENDERER_MAP = {
  addColumn: AddColumn,
  headerCell: HeaderCell,
  gridCellTextRenderer: GridCellTextRenderer,
  gridCellNumberRenderer: GridCellNumberRenderer,
  gridCellDateRenderer: GridCellDateRenderer,
  gridCellSelectRenderer: GridCellSelectRenderer,
  gridCellMultiSelectRenderer: GridCellMultiSelectRenderer,
  gridCellReferenceRenderer: GridCellReferenceRenderer,
  gridCellLookupRenderer: GridCellLookupRenderer,
  gridCellAttachmentRenderer: GridCellAttachmentRenderer,
};
