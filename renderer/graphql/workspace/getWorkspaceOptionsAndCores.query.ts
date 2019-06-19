import gql from 'graphql-tag';

export const GET_WORKSPACE_OPTIONS_AND_CORES_QUERY = gql`
  query GetWorkspaceOptionsAndCoresQuery(
    $workspaceIdInput: WorkspaceIdInput!
    $includeOptions: Boolean!
    $includeCores: Boolean!
    $includeTables: Boolean!
  ) {
    workspaceOptions: workspaces @include(if: $includeOptions) {
      id
      name
    }
    workspace(workspaceIdInput: $workspaceIdInput) @include(if: $includeCores) {
      id
      name
      cores {
        id
        name
        color
        icon
        tables @include(if: $includeTables) {
          id
          name
        }
      }
    }
  }
`;
