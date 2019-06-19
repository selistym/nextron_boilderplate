import { createModel } from '@rematch/core';
import cookie from 'cookie';
import Router from 'next/router';

import { login } from './network';

export default createModel({
  state: {
    loading: {
      isLoading: true,
    },
  },
  reducers: {
    setIsLoading(state, payload) {
      return { ...state, loading: { isLoading: payload } };
    },
  },
  effects: {
    async login(payload) {
      try {
        const {
          login: { token },
        } = await login(payload);

        if (token) {
          document.cookie = cookie.serialize('token', token, {
            maxAge: 7 * 24 * 60 * 60, // 7 days
          });
        }

        Router.replace('/cores');
      } catch (err) {
        // tslint:disable-next-line: no-console
        console.warn('Error: ', err);
      } finally {
        this.setIsLoading(false);
      }
    },
  },
});
