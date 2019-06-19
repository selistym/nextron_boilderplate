import { gql } from 'apollo-boost';

export const ADD_TABLE_MUTATION = gql`
  mutation AddTableMutation($addTableInput: AddTableInput!) {
    addTable(addTableInput: $addTableInput) {
      id
    }
  }
`;
