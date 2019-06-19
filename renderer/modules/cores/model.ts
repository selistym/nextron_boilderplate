import { createModel } from '@rematch/core';
import Router from 'next/router';

import { addAllIds, addById } from '../shared/helper';
import { adaptGetWorkspaceOptionsAndCores } from './adapter';
import { handleCoreCreated } from './handler';

import { workspaceUpdatedSubscription } from '../shared/network';
import { addCoreToWorkspace, getWorkspaceCores } from './network';

import { compareTopics } from '@app/lib/subscriptionTopic';

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
    activeWorkspace: {
      cores: [],
    },
    cores: {
      byId: {},
    },
    subs: [],
  },
  reducers: {
    setAllWorkspaceOptionsAndCores(state, payload) {
      return {
        ...state,
        workspaceOptions: payload.workspaceOptions,
        activeWorkspace: payload.activeWorkspace,
        cores: payload.cores,
      };
    },
    setIsLoading(state, payload) {
      return { ...state, loading: { isLoading: payload } };
    },
    setActiveWorkspaceId(state, payload) {
      return { ...state, activeWorkspaceId: payload };
    },

    /** subscription handlers */
    setSubs(state, payload) {
      return { ...state, subs: payload };
    },
    handleCoreCreatedEvent(state, payload) {
      const newCore = handleCoreCreated(state, payload);
      if (!newCore) return state;
      return {
        ...state,
        activeWorkspace: addAllIds(state.activeWorkspace, newCore, 'cores'),
        cores: addById(state.cores, newCore),
      };
    },
  },
  effects: {
    /**
     * Initial query and handler when user lands on /cores page. The workspaceId can exist or not. If it doesn't exist,
     * we need to first retrieve the workspaceOptions, and set a default on the first one. Subscriptions is at the end.
     * @param workspaceId
     */
    async getAllWorkspaceOptionsAndCores(workspaceId?: string) {
      if (workspaceId) {
        try {
          const response = await getWorkspaceCores({ id: workspaceId }, true, true, false);
          this.adaptSetAndInitiateWorkspace({ workspaceId, response });
        } catch (err) {
          // tslint:disable-next-line: no-console
          console.warn('Error: ', err);
        }
      } else {
        try {
          const optionsResponse = await getWorkspaceCores({ id: '' }, true, false, false);
          const defaultId = optionsResponse.workspaceOptions[0].id;
          const response = await getWorkspaceCores({ id: defaultId }, false, true, false);
          Router.replace(`/cores`, `/cores/${defaultId}`, { shallow: true });

          this.adaptSetAndInitiateWorkspace({
            workspaceId: defaultId,
            response: {
              workspaceOptions: optionsResponse.workspaceOptions,
              workspace: response.workspace,
            },
          });
        } catch (err) {
          // tslint:disable-next-line: no-console
          console.warn('Error: ', err);
        }
      }

      this.setIsLoading(false);
    },
    async addNewCoreToWorkspace(payload) {
      try {
        await addCoreToWorkspace(payload);
      } catch (err) {
        // tslint:disable-next-line: no-console
        console.warn('Error: ', err);
      }
    },

    /** subscriptions */
    initiateSubscription(subInput) {
      const subscription = workspaceUpdatedSubscription(subInput);

      const coreCreatedSub = subscription
        .filter((payload: any) => compareTopics(payload.eventName, '#.CoreCreated'))
        .subscribe(this.handleCoreCreatedEvent);

      const logSub = subscription.subscribe((payload) => {
        // tslint:disable-next-line: no-console
        console.log(payload.eventName);
      });

      this.setSubs([coreCreatedSub, logSub]);
    },
    stopSubs(_, rootState) {
      rootState.cores.subs.forEach((sub) => sub.unsubscribe());
      this.setSubs([]);
    },

    /** Effect Helpers */
    adaptSetAndInitiateWorkspace({ workspaceId, response }) {
      const adaptedResponse = adaptGetWorkspaceOptionsAndCores(response);
      this.setAllWorkspaceOptionsAndCores(adaptedResponse);
      this.setActiveWorkspaceId(workspaceId);
      this.initiateSubscription({ workspaceId });
    },
  },
});
