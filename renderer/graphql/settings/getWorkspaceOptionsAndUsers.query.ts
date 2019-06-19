import gql from 'graphql-tag';

export const GET_WORKSPACE_OPTIONS_AND_USERS_QUERY = gql`
  query GetWorkspaceOptionsAndUsersQuery(
    $workspaceIdInput: WorkspaceIdInput!
    $includeOptions: Boolean!
    $includeWorkspace: Boolean!
  ) {
    workspaceOptions: workspaces @include(if: $includeOptions) {
      id
      name
    }
    workspace(workspaceIdInput: $workspaceIdInput) @include(if: $includeWorkspace) {
      id
      name
      users {
        workspaceId
        userId
        email
        firstName
        lastName
        accessLevel
        cores {
          id
          name
        }
      }
    }
  }
`;
