/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { WorkspaceIdInput, ViewType, ColumnType } from './../../../types/graphql-global-types';

// ====================================================
// GraphQL query operation: GetViewsQuery
// ====================================================

export interface GetViewsQuery_workspace_cores_tables_views_columns {
  __typename: 'ColumnDefinition';
  id: string;
  name: string;
  type: ColumnType;
  typeOptions: any;
}

export interface GetViewsQuery_workspace_cores_tables_views_rows {
  __typename: 'RowData';
  id: string;
  cells: (any | null)[] | null;
}

export interface GetViewsQuery_workspace_cores_tables_views {
  __typename: 'ViewData';
  id: string;
  type: ViewType;
  name: string;
  columns: (GetViewsQuery_workspace_cores_tables_views_columns | null)[];
  rows: (GetViewsQuery_workspace_cores_tables_views_rows | null)[];
}

export interface GetViewsQuery_workspace_cores_tables {
  __typename: 'TableOutput';
  id: string;
  views: (GetViewsQuery_workspace_cores_tables_views | null)[];
}

export interface GetViewsQuery_workspace_cores {
  __typename: 'CoreOutput';
  id: string;
  tables: GetViewsQuery_workspace_cores_tables[] | null;
}

export interface GetViewsQuery_workspace {
  __typename: 'WorkspaceOutput';
  id: string;
  cores: GetViewsQuery_workspace_cores[] | null;
}

export interface GetViewsQuery {
  workspace: GetViewsQuery_workspace;
}

export interface GetViewsQueryVariables {
  workspaceIdInput: WorkspaceIdInput;
  coreId: string;
  tableId: string;
}
