/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { WorkspaceIdInput } from './../../../types/graphql-global-types';

// ====================================================
// GraphQL query operation: GetWorkspaceOptionsAndCoresQuery
// ====================================================

export interface GetWorkspaceOptionsAndCoresQuery_workspaceOptions {
  __typename: 'WorkspaceMetaOutput';
  id: string;
  name: string;
}

export interface GetWorkspaceOptionsAndCoresQuery_workspace_cores_tables {
  __typename: 'TableOutput';
  id: string;
  name: string;
}

export interface GetWorkspaceOptionsAndCoresQuery_workspace_cores {
  __typename: 'CoreOutput';
  id: string;
  name: string;
  color: string;
  icon: string;
  tables: GetWorkspaceOptionsAndCoresQuery_workspace_cores_tables[] | null;
}

export interface GetWorkspaceOptionsAndCoresQuery_workspace {
  __typename: 'WorkspaceOutput';
  id: string;
  name: string;
  cores: GetWorkspaceOptionsAndCoresQuery_workspace_cores[] | null;
}

export interface GetWorkspaceOptionsAndCoresQuery {
  workspaceOptions: (GetWorkspaceOptionsAndCoresQuery_workspaceOptions | null)[];
  workspace: GetWorkspaceOptionsAndCoresQuery_workspace;
}

export interface GetWorkspaceOptionsAndCoresQueryVariables {
  workspaceIdInput: WorkspaceIdInput;
  includeOptions: boolean;
  includeCores: boolean;
  includeTables: boolean;
}
