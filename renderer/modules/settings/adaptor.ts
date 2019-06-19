import { getByIdAndAllIds } from '../shared/helper';

import {
  GetWorkspaceOptionsAndUsersQuery,
  GetWorkspaceOptionsAndUsersQuery_workspace,
} from '@app/graphql/settings/types/GetWorkspaceOptionsAndUsersQuery';

export const adaptGetWorkspaceOptionsAndUsers = ({
  workspace,
  workspaceOptions,
}: GetWorkspaceOptionsAndUsersQuery) => {
  const adaptedWorkspaceOptions = getByIdAndAllIds(workspaceOptions);
  const { activeWorkspace, collaborators } = adaptWorkspaceAndUsers(workspace);
  return { activeWorkspace, collaborators, workspaceOptions: adaptedWorkspaceOptions };
};

const adaptWorkspaceAndUsers = (workspace: GetWorkspaceOptionsAndUsersQuery_workspace) => {
  const activeWorkspace = { id: workspace.id, name: workspace.name };
  const collaborators = (workspace.users || []).reduce(
    (obj, user) => {
      obj[user.userId] = user;
      return obj;
    },
    {} as any,
  );
  return { activeWorkspace, collaborators };
};
