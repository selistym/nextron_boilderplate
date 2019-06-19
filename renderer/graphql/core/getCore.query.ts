import { gql } from 'apollo-boost';

export const GET_CORE_QUERY = gql`
  query GetCoreQuery(
    $workspaceIdInput: WorkspaceIdInput!
    $coreId: String!
    $tableId: String
    $viewId: String
    $includeOptions: Boolean!
    $includeView: Boolean!
  ) {
    workspace(workspaceIdInput: $workspaceIdInput) {
      id
      name
      cores(id: $coreId) {
        id
        name
        color
        icon
        tableOptions: tables @include(if: $includeOptions) {
          id
          name
          viewOptions: views {
            id
            type
            name
          }
        }
        tables(id: $tableId) @include(if: $includeView) {
          id
          views(id: $viewId) {
            id
            type
            name
            columns {
              id
              name
              type
              typeOptions
            }
            rows {
              id
              cells
            }
          }
        }
      }
    }
  }
`;
