import { get } from 'lodash';
import { NextContext } from 'next';
import App, { Container } from 'next/app';
import { withRouter } from 'next/router';
import * as React from 'react';
import { ApolloProvider, compose } from 'react-apollo';
import { addLocaleData, IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';

import Pages from '@app/renderer/pages';

import { ACCEPTED_LOCALES, DEFAULT_LOCALE } from '@app/renderer/constants/app';
import withRematch from '@app/renderer/lib/withRematch';
import { theme } from '@app/renderer/theme';
import { parseCookies } from '@app/renderer/utils';
import apolloClient from '@app/renderer/utils/api';

import { ThemeProvider } from 'styled-components';
// NOTE: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31245
import * as types from 'styled-components/cssprop';

import enMessages from '../locales/en.json';
import zhMessages from '../locales/zh.json';

addLocaleData([...en, ...zh]);

const localeMessages: { [key: string]: object } = {
  en: enMessages,
  zh: zhMessages,
};

class MyApp extends App<any> {
  public static async getInitialProps({ Component, ctx }: { Component: any; ctx: NextContext }) {
    const locale = parseCookies(get(ctx, 'req')).locale;
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, locale: ACCEPTED_LOCALES.indexOf(locale) === -1 ? DEFAULT_LOCALE : locale };
  }

  public render() {
    const { Component, pageProps, locale, store } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <IntlProvider locale={DEFAULT_LOCALE} messages={localeMessages[locale]}>
            <ApolloProvider client={apolloClient}>
              <ThemeProvider theme={theme}>
                <Pages>
                  <Component {...pageProps} client={apolloClient} />
                </Pages>
              </ThemeProvider>
            </ApolloProvider>
          </IntlProvider>
        </Provider>
      </Container>
    );
  }
}

export default compose(
  withRematch,
  withRouter,
)(MyApp);
