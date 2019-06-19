import Head from 'next/head';
import React, { Fragment } from 'react';
import { compose } from 'react-apollo';
import { Form } from 'react-final-form';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import Icon, { glyphs } from '@app/renderer/components/Icon';
import LoginForm from '@app/renderer/components/Login/Form';
import Meta from '@app/renderer/components/Meta';

import { IDispatch } from '@app/renderer/modules/store';

import { Container, Wrapper } from '@app/renderer/components/Shared/Layout';
import { ContainerContent } from './styled';

type IConnectProps = ReturnType<typeof mapDispatch>;

type IProps = IConnectProps & InjectedIntlProps;

const Login: React.FC<IProps> = ({ intl: { formatMessage }, login }) => (
  <Fragment>
    <Head>
      <title>{formatMessage({ id: 'pageTitle.login' })}</title>
      <meta content="Login Page" name="description" />
    </Head>
    <Meta />
    <Wrapper>
      <Container>
        <ContainerContent>
          <Icon icon={glyphs.LOGO_FULL_REGULAR} size={{ width: 400, height: 200 }} />
          <Form onSubmit={login} render={(props: any) => <LoginForm {...props} />} />
        </ContainerContent>
      </Container>
    </Wrapper>
  </Fragment>
);

const mapDispatch = ({ login }: IDispatch) => ({
  login: (payload: any) => login.login(payload),
});

export default compose(
  connect(
    undefined,
    mapDispatch,
  ),
  injectIntl,
)(Login);
