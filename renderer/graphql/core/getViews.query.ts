import { gql } from 'apollo-boost';

export const GET_VIEWS_QUERY = gql`
  query GetViewsQuery($workspaceIdInput: WorkspaceIdInput!, $coreId: String!, $tableId: String!) {
    workspace(workspaceIdInput: $workspaceIdInput) {
      id
      cores(id: $coreId) {
        id
        tables(id: $tableId) {
          id
          views {
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
