import apollo from '@app/utils/api';

import { WORKSPACE_UPDATED_SUBSCRIPTION } from '@app/graphql/workspace/workspaceUpdated.subscribe';

import { WorkspaceSubscriptionInput } from '@app/types/graphql-global-types';

export const workspaceUpdatedSubscription = (
  workspaceSubscriptionInput: WorkspaceSubscriptionInput,
) => {
  const subscription = apollo
    .subscribe({
      query: WORKSPACE_UPDATED_SUBSCRIPTION,
      variables: {
        workspaceSubscriptionInput,
      },
    })
    .map((event: any) => event.data.workspaceUpdated.payload);

  return subscription;
};
