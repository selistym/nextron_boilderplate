import React from 'react';
import { get } from 'lodash';
import { NextContext } from 'next/app';
import App, { Container } from 'next/app';
import { withRouter } from 'next/router';
import { ApolloProvider, compose } from 'react-apollo';
import { addLocaleData, IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';

import Pages from '../pages';
import { ACCEPTED_LOCALES, DEFAULT_LOCALE } from '../constants/app';
import withRematch from '@app/lib/withRematch';
// import { theme } from '../theme';
import { parseCookies } from '../utils';
import apolloClient from '../utils/api';

import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../components/theme';


class MyApp extends App {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <title>ARK</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Container>
    );
  }
}

export default MyApp;
