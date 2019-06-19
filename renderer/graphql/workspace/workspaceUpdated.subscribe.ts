import { gql } from 'apollo-boost';

export const WORKSPACE_UPDATED_SUBSCRIPTION = gql`
  subscription WorkspaceUpdated($workspaceSubscriptionInput: WorkspaceSubscriptionInput!) {
    workspaceUpdated(workspaceSubscriptionInput: $workspaceSubscriptionInput) {
      payload
    }
  }
`;
