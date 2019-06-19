import { get } from 'lodash';

export const handleCoreCreated = (coresState, payload: any) => {
  const { coreCreatedDto, workspaceId } = payload;
  const core = get(coresState, `cores.byId${coreCreatedDto.coreId}`);
  const activeWorkspaceId = get(coresState, 'activeIds.workspaceId');

  if (!core && activeWorkspaceId === workspaceId) {
    return {
      id: coreCreatedDto.coreId,
      name: coreCreatedDto.coreName,
      color: coreCreatedDto.color,
      icon: coreCreatedDto.icon,
      tables: [],
    };
  }
};
