import { NextContext } from 'next';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import CoresList from '@app/renderer/components/Core/List';
import Header from '@app/renderer/components/Header';
import HeaderNavigation from '@app/renderer/components/Header/Navigation';
import Spinner from '@app/renderer/components/Loading/Spinner';
import { Container, Wrapper } from '@app/renderer/components/Shared/Layout';

import { IDispatch, IRootState } from '@app/renderer/modules/store';

import { SpinnerWrapper } from './styled';

type IConnectProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;
interface IProps extends IConnectProps {
  urlWorkspaceId: string;
}

const Cores: React.FC<IProps> = ({
  urlWorkspaceId,
  isLoading,
  getAllWorkspaceOptionsAndCores,
  stopSubs,
}) => {
  useEffect(
    () => {
      getAllWorkspaceOptionsAndCores(urlWorkspaceId);
      return () => {
        stopSubs();
      };
    },
    [urlWorkspaceId],
  );

  return (
    <Wrapper>
      <Container>
        <Header showAccount={true} />
        <HeaderNavigation />
        {isLoading ? (
          <SpinnerWrapper>
            <Spinner size="medium" strokeWidth="4px" />
          </SpinnerWrapper>
        ) : (
          <CoresList />
        )}
      </Container>
    </Wrapper>
  );
};

Cores.getInitialProps = async (context: NextContext) => {
  const { workspaceId } = context.query;
  return { urlWorkspaceId: workspaceId };
};

const mapState = (state: IRootState) => ({
  isLoading: state.cores.loading.isLoading,
});

const mapDispatch = ({ cores }: IDispatch) => ({
  getAllWorkspaceOptionsAndCores: (id: string) => cores.getAllWorkspaceOptionsAndCores(id),
  stopSubs: () => cores.stopSubs({}),
});

export default connect(
  mapState,
  mapDispatch,
)(Cores);
