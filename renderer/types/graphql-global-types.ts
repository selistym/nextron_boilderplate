/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ColumnType {
  DATETIME = 'DATETIME',
  FORMULA = 'FORMULA',
  LOOKUP = 'LOOKUP',
  MULTI_ATTACHMENT = 'MULTI_ATTACHMENT',
  MULTI_SELECT = 'MULTI_SELECT',
  NUMBER = 'NUMBER',
  RECORD_REFERENCE = 'RECORD_REFERENCE',
  SELECT = 'SELECT',
  TEXT = 'TEXT',
}

export enum UpdateAction {
  ADD_VALUE = 'ADD_VALUE',
  REMOVE_VALUE = 'REMOVE_VALUE',
  SET_VALUE = 'SET_VALUE',
}

export enum ViewType {
  GRID = 'GRID',
  TIMELINE = 'TIMELINE',
}

export interface AddColumnInput {
  workspaceId: string;
  coreId: string;
  tableId: string;
  columnConfig: ColumnConfigInput;
}

export interface AddCoreInput {
  workspaceId: string;
  coreName: string;
  color: string;
  icon: string;
}

export interface AddRowInput {
  workspaceId: string;
  coreId: string;
  tableId: string;
}

export interface AddTableInput {
  workspaceId: string;
  coreId: string;
  tableName: string;
}

export interface AddViewInput {
  workspaceId: string;
  coreId: string;
  tableId: string;
  view: ViewDefinitionInput;
}

export interface AttachmentInput {
  name: string;
  url: string;
}

export interface CellValueInput {
  type: ColumnType;
  text?: string | null;
  foreignRowId?: string | null;
  foreignLookupColumnId?: string | null;
  foreignLookupRowId?: string | null;
  number?: number | null;
  selectedItem?: ChoiceInput | null;
  selectedItems?: (ChoiceInput | null)[] | null;
  attachments?: (AttachmentInput | null)[] | null;
  dateTime?: string | null;
}

export interface ChoiceInput {
  id: string;
  name: string;
  color: string;
}

export interface ColumnConfigInput {
  type: ColumnType;
  name: string;
  formula?: string | null;
  foreignTableId?: string | null;
  recordReferenceColumnId?: string | null;
  foreignLookupColumnId?: string | null;
  defaultNumber?: number | null;
  precision?: number | null;
  choices?: (ChoiceInput | null)[] | null;
  dateFormat?: string | null;
  includeTime?: boolean | null;
  timeFormat?: string | null;
  useGMT?: boolean | null;
}

export interface RemoveCoreInput {
  workspaceId: string;
  coreId: string;
}

export interface UpdateCellActionInput {
  type: UpdateAction;
  value: CellValueInput;
}

export interface UpdateCellInput {
  workspaceId: string;
  coreId: string;
  tableId: string;
  columnId: string;
  rowId: string;
  action: UpdateCellActionInput;
}

export interface ViewDefinitionInput {
  name: string;
  type: ViewType;
}

export interface WorkspaceIdInput {
  id: string;
}

export interface WorkspaceSubscriptionInput {
  workspaceId: string;
  topic?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
