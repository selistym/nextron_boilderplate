import { createModel } from '@rematch/core';
import Router from 'next/router';

import { adaptGetWorkspaceOptionsAndUsers } from './adaptor';
import { getWorkspacesAndUsers } from './network';

export default createModel({
  state: {
    activeWorkspaceId: '',
    loading: {
      isLoading: true,
    },
    workspaceOptions: {
      byId: {},
      allIds: [],
    },
    collaborators: {
      byId: {},
    },
    activeWorkspace: {
      id: '',
      name: '',
    },
  },
  reducers: {
    setAllWorkspaceOptionsAndUsers(state, payload) {
      return {
        ...state,
        workspaceOptions: payload.workspaceOptions,
        activeWorkspace: payload.activeWorkspace,
        collaborators: payload.collaborators,
      };
    },
    setActiveWorkspaceId(state, payload) {
      return { ...state, activeWorkspaceId: payload };
    },
    setIsLoading(state, payload) {
      return { ...state, loading: { isLoading: payload } };
    },
  },
  effects: {
    async getAllWorkspaceOptionsAndUsers(workspaceId?: string) {
      try {
        let activeWorkspaceId = workspaceId;
        if (!activeWorkspaceId) {
          const optionsResponse = await getWorkspacesAndUsers({
            workspaceIdInput: { id: '' },
            includeOptions: true,
            includeWorkspace: false,
          });
          const defaultWorkspace = optionsResponse.workspaceOptions[0];
          activeWorkspaceId = defaultWorkspace!.id;
          Router.replace(`/settings`, `/workspace/${activeWorkspaceId}`, { shallow: true });
        }
        const response = await getWorkspacesAndUsers({
          workspaceIdInput: { id: activeWorkspaceId },
          includeOptions: true,
          includeWorkspace: true,
        });

        this.setAllWorkspaceOptionsAndUsers(adaptGetWorkspaceOptionsAndUsers(response));
        this.setActiveWorkspaceId(activeWorkspaceId);
      } catch (err) {
        // tslint:disable-next-line: no-console
        console.warn('Error: ', err);
      } finally {
        this.setIsLoading(false);
      }
    },
  },
});
