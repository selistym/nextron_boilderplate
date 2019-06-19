import { NextContext } from 'next';
import Error from 'next/error';
import React from 'react';

import redirect from '@app/renderer/lib/redirect';

class ErrorPage extends React.Component {
  public static async getInitialProps(context: NextContext) {
    if (context.asPath === '/') {
      redirect(context, '/cores');
    }

    return {};
  }

  public render() {
    return <Error statusCode={404} />;
  }
}

export default ErrorPage;
