import { getByIdAndAllIds } from '../shared/helper';

import {
  GetWorkspaceOptionsAndCoresQuery_workspace,
  GetWorkspaceOptionsAndCoresQuery_workspaceOptions,
} from '@app/graphql/workspace/types/GetWorkspaceOptionsAndCoresQuery';

export const adaptGetWorkspaceOptionsAndCores = ({
  workspace,
  workspaceOptions,
}: {
  workspace: GetWorkspaceOptionsAndCoresQuery_workspace;
  workspaceOptions: GetWorkspaceOptionsAndCoresQuery_workspaceOptions[];
}) => {
  const { activeWorkspace, cores } = adaptWorkspaceAndCores(workspace);
  const adaptedWorkspaceOptions = getByIdAndAllIds(workspaceOptions);
  return { activeWorkspace, cores, workspaceOptions: adaptedWorkspaceOptions };
};

/** Helpers */
const adaptWorkspaceAndCores = (workspace: GetWorkspaceOptionsAndCoresQuery_workspace) => {
  const activeWorkspace = { id: workspace.id, name: workspace.name };
  const cores = getByIdAndAllIds(workspace.cores || []);

  activeWorkspace.cores = cores.allIds;

  return { activeWorkspace, cores: { byId: cores.byId } };
};
