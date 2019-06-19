/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { WorkspaceIdInput } from './../../../types/graphql-global-types';

// ====================================================
// GraphQL query operation: GetWorkspaceOptionsAndUsersQuery
// ====================================================

export interface GetWorkspaceOptionsAndUsersQuery_workspaceOptions {
  __typename: 'WorkspaceMetaOutput';
  id: string;
  name: string;
}

export interface GetWorkspaceOptionsAndUsersQuery_workspace_users_cores {
  __typename: 'CoreOutput';
  id: string;
  name: string;
}

export interface GetWorkspaceOptionsAndUsersQuery_workspace_users {
  __typename: 'UserOutput';
  workspaceId: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  accessLevel: string;
  cores: GetWorkspaceOptionsAndUsersQuery_workspace_users_cores[] | null;
}

export interface GetWorkspaceOptionsAndUsersQuery_workspace {
  __typename: 'WorkspaceOutput';
  id: string;
  name: string;
  users: GetWorkspaceOptionsAndUsersQuery_workspace_users[] | null;
}

export interface GetWorkspaceOptionsAndUsersQuery {
  workspaceOptions: (GetWorkspaceOptionsAndUsersQuery_workspaceOptions | null)[];
  workspace: GetWorkspaceOptionsAndUsersQuery_workspace;
}

export interface GetWorkspaceOptionsAndUsersQueryVariables {
  workspaceIdInput: WorkspaceIdInput;
  includeOptions?: boolean | null;
  includeWorkspace?: boolean | null;
}
