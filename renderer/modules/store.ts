import { init, RematchRootState } from '@rematch/core';

import app from './app/model';
import core from './core/model';
import coreBuds from './coreBuds/model';
import cores from './cores/model';
import login from './login/model';
import settings from './settings/model';

const models = {
  app,
  core,
  settings,
  login,
  coreBuds,
  cores,
};

export const store = init({ models });

// https://rematch.gitbooks.io/rematch/docs/recipes/typescript.html
export type IStore = typeof store;
export type IDispatch = typeof store.dispatch;
export type IRootState = RematchRootState<typeof models>;
