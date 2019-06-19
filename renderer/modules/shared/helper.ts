import { compareTopics } from '@app/renderer/lib/subscriptionTopic';
import { get, uniq } from 'lodash';
import { workspaceUpdatedSubscription } from './network';

export const filterObjectByKey = (obj, f) => {
  return Object.entries(obj)
    .filter(([key, value]) => f(key))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
};

/**
 * Receives a list of objects with ids, and returns byId and allIds by looping through everything once.
 */
export const getByIdAndAllIds = (list: Array<{ id: string } | null>) => {
  const byId: { [key: string]: any } = {};
  const allIds: string[] = [];

  list.forEach((item: { id: string } | null) => {
    if (item) {
      byId[item.id] = item;
      allIds.push(item.id);
    }
  });

  return { byId, allIds };
};

/**
 * Add one item in byId and allIds
 */
export const addByIdAndAllIds = (state: any, payload: { id: string }) => ({
  ...addById(state, payload),
  allIds: uniq(state.allIds.concat(payload.id)),
});

/**
 * Add byId when it is *only* byId, and not allIds, and byId.
 * ex. state is `state.cores`, and payload is a new core object
 */
export const addById = (state: any, payload: { id: string }) => ({
  ...state,
  byId: {
    ...state.byId,
    [payload.id]: payload,
  },
});

/**
 * Add child allIds when it is *only* allIds, and not allIds, and byId.
 * ex. state is `state.activeWorkspace`, and payload is a new core object, key is `'cores'`
 */
export const addAllIds = (state: any, payload: { id: string }, key: string) => ({
  ...state,
  [key]: state[key].concat(payload.id),
});

/**
 * ex. when we need to add viewId into tableOptions.byId[table.id].viewOptionsAllIds
 * @childKey ex. 'viewOptionsAllIds'
 * @parentKey ex. 'tableOptions'
 */
export const addAllIdsOptionToParent = (
  state: any,
  payload: { id: string },
  childKey: string,
  parentId: string,
  parentKey: string,
) => {
  const innerState = get(state, `${parentKey}.byId.${parentId}`);
  if (!innerState) {
    // tslint:disable-next-line: no-console
    console.warn('Invalid operation from: addAllIdsOptionToParent');
    return null;
  }

  return {
    byId: { ...state[parentKey].byId, [parentId]: addAllIds(innerState, payload, childKey) },
  };
};

export const removeById = (state, payload) => {
  const { idToRemove } = payload;
  return filterObjectByKey(state, (id) => id !== idToRemove);
};

export const removeAllIds = (state, payload) => {
  const { idToRemove } = payload;
  return state.filter((id) => id !== idToRemove);
};

/** Network Helpers */
export const waitForCellChange = (payload) => {
  const { workspaceId, columnId, rowId, callback } = payload;
  let subscription: any;

  subscription = workspaceUpdatedSubscription({ workspaceId })
    .filter((load: any) => compareTopics(load.eventName, '#.CellUpdated'))
    .filter((load: any) => load.rowId === rowId)
    .filter((load: any) => load.columnId === columnId)
    .subscribe((load: any) => {
      callback(load);
      if (subscription) subscription.unsubscribe();
    });
};
