import React from 'react';

import { store } from '@app/renderer/modules/store';
import { isServer } from '@app/renderer/utils/app';

const __NEXT_REDUX_STORE__: string = '__NEXT_REDUX_STORE__';

// https://github.com/zeit/next.js/blob/canary/examples/with-rematch/shared/withRematch.js
function getOrCreateStore() {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer()) {
    return store;
  }

  // Create store if unavailable on the client and set it on the window object
  if (!(window as any)[__NEXT_REDUX_STORE__]) {
    (window as any)[__NEXT_REDUX_STORE__] = store;
  }

  return (window as any)[__NEXT_REDUX_STORE__];
}

export default (App: any) => {
  return class AppWithRematch extends React.Component {
    public static async getInitialProps(appContext) {
      const reduxStore = getOrCreateStore();

      // Provide the store to getInitialProps of pages
      appContext.ctx.store = reduxStore;

      let appProps = {};
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext);
      }

      return {
        ...appProps,
        initialReduxState: store.getState(),
      };
    }

    constructor(props) {
      super(props);
      this.store = getOrCreateStore();
    }

    public render() {
      return <App {...this.props} store={this.store} />;
    }
  };
};
