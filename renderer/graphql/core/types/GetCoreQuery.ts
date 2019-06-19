/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { WorkspaceIdInput, ViewType, ColumnType } from './../../../types/graphql-global-types';

// ====================================================
// GraphQL query operation: GetCoreQuery
// ====================================================

export interface GetCoreQuery_workspace_cores_tableOptions_viewOptions {
  __typename: 'ViewData';
  id: string;
  type: ViewType;
  name: string;
}

export interface GetCoreQuery_workspace_cores_tableOptions {
  __typename: 'TableOutput';
  id: string;
  name: string;
  viewOptions: (GetCoreQuery_workspace_cores_tableOptions_viewOptions | null)[];
}

export interface GetCoreQuery_workspace_cores_tables_views_columns {
  __typename: 'ColumnDefinition';
  id: string;
  name: string;
  type: ColumnType;
  typeOptions: any;
}

export interface GetCoreQuery_workspace_cores_tables_views_rows {
  __typename: 'RowData';
  id: string;
  cells: (any | null)[] | null;
}

export interface GetCoreQuery_workspace_cores_tables_views {
  __typename: 'ViewData';
  id: string;
  type: ViewType;
  name: string;
  columns: (GetCoreQuery_workspace_cores_tables_views_columns | null)[];
  rows: (GetCoreQuery_workspace_cores_tables_views_rows | null)[];
}

export interface GetCoreQuery_workspace_cores_tables {
  __typename: 'TableOutput';
  id: string;
  views: (GetCoreQuery_workspace_cores_tables_views | null)[];
}

export interface GetCoreQuery_workspace_cores {
  __typename: 'CoreOutput';
  id: string;
  name: string;
  color: string;
  icon: string;
  tableOptions: GetCoreQuery_workspace_cores_tableOptions[] | null;
  tables: GetCoreQuery_workspace_cores_tables[] | null;
}

export interface GetCoreQuery_workspace {
  __typename: 'WorkspaceOutput';
  id: string;
  name: string;
  cores: GetCoreQuery_workspace_cores[] | null;
}

export interface GetCoreQuery {
  workspace: GetCoreQuery_workspace;
}

export interface GetCoreQueryVariables {
  workspaceIdInput: WorkspaceIdInput;
  coreId: string;
  tableId?: string | null;
  viewId?: string | null;
  includeOptions: boolean;
  includeView: boolean;
}
