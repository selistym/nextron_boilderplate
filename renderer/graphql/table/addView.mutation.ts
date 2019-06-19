import gql from 'graphql-tag';

export const ADD_VIEW_MUTATION = gql`
  mutation AddViewMutation($addViewInput: AddViewInput!) {
    addView(addViewInput: $addViewInput) {
      id
    }
  }
`;
