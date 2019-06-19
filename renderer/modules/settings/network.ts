import apollo from '@app/renderer/utils/api';

import { GET_WORKSPACE_OPTIONS_AND_USERS_QUERY } from '@app/renderer/graphql/settings/getWorkspaceOptionsAndUsers.query';
import {
  GetWorkspaceOptionsAndUsersQuery,
  GetWorkspaceOptionsAndUsersQueryVariables,
} from '@app/renderer/graphql/settings/types/GetWorkspaceOptionsAndUsersQuery';

export const getWorkspacesAndUsers = async ({
  workspaceIdInput,
  includeOptions,
  includeWorkspace,
}: GetWorkspaceOptionsAndUsersQueryVariables): Promise<GetWorkspaceOptionsAndUsersQuery> => {
  return apollo
    .query({
      query: GET_WORKSPACE_OPTIONS_AND_USERS_QUERY,
      variables: { workspaceIdInput, includeOptions, includeWorkspace },
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    })
    .then((result) => result.data);
};
