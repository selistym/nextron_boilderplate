import apollo from '@app/utils/api';

import { ADD_CORE_MUTATION } from '@app/graphql/core/addCore.mutation';
import { GET_WORKSPACE_OPTIONS_AND_CORES_QUERY } from '@app/graphql/workspace/getWorkspaceOptionsAndCores.query';

import { AddCoreInput, WorkspaceIdInput } from '@app/types/graphql-global-types';

export const addCoreToWorkspace = async (addCoreInput: AddCoreInput) => {
  const response = await apollo.mutate({
    mutation: ADD_CORE_MUTATION,
    variables: { addCoreInput },
  });

  return response.data.addCore;
};

export const getWorkspaceCores = async (
  workspaceIdInput: WorkspaceIdInput,
  includeOptions: boolean,
  includeCores: boolean,
  includeTables: boolean,
) => {
  let response;
  try {
    const workspaceCoresQuery = await apollo.query({
      query: GET_WORKSPACE_OPTIONS_AND_CORES_QUERY,
      variables: { workspaceIdInput, includeOptions, includeCores, includeTables },
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    });

    response = workspaceCoresQuery.data;
  } catch (err) {
    response = err;
  }

  return response;
};
