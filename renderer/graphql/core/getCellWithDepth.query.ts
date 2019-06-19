import { gql } from 'apollo-boost';

export const GET_CELL_WITH_DEPTH_QUERY = gql`
  query GetCellWithDepthQuery($rowId: String!, $columnId: String!, $depth: Int) {
    getLookupCellByColumnAndRowId(
      getLookupCellByColumnAndRowIdInput: { rowId: $rowId, columnId: $columnId, depth: $depth }
    )
  }
`;
