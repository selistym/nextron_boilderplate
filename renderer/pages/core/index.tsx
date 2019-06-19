import { get } from 'lodash';
import { NextContext } from 'next';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import BudDrawer from '@app/renderer/components/Bud/Drawer';
import CoreControls from '@app/renderer/components/Core/Controls';
import CoreHeader from '@app/renderer/components/Core/Header';
import CoreTabSection from '@app/renderer/components/Core/TabSection';
import Spinner from '@app/renderer/components/Loading/Spinner';
import MetaNoScroll from '@app/renderer/components/Meta/NoScroll';
import { CORE_COLORS } from '@app/renderer/constants/cores';

import { IDispatch, IRootState } from '@app/renderer/modules/store';

import { Container, HeaderContainer, SpinnerWrapper } from './styled';

type IConnectProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;
interface IProps extends IConnectProps {
  params: { workspaceId: string; coreId: string; tableId: string };
}

// @Derek Refactor.
const GridNoSSR = dynamic(() => import('./GridWrapper'), {
  ssr: false,
});
const ListNoSSR = dynamic(() => import('./ListWrapper'), {
  ssr: false,
});

const Core: React.FC<IProps> = ({
  activeCore,
  params,
  getCoreAndView,
  isLoadingCore,
  isLoadingView,
  resetStateAndStopSubs,
  workspaceId,
  viewId,
  viewOptionsById,
}) => {
  useEffect(() => {
    return () => {
      resetStateAndStopSubs();
    };
  }, []);
  useEffect(
    () => {
      getCoreAndView(params);
    },
    [params],
  );

  return (
    <>
      <MetaNoScroll />
      <BudDrawer />
      <Container>
        {isLoadingCore ? (
          <Loader />
        ) : (
          <>
            <HeaderContainer backgroundColor={CORE_COLORS[activeCore.color]}>
              <CoreHeader workspaceId={workspaceId} />
              <CoreTabSection />
              <CoreControls />
            </HeaderContainer>
            {!isLoadingView &&
              (() => {
                switch (get(viewOptionsById, `${viewId}.type`)) {
                  case 'GRID':
                    return <GridNoSSR />;
                  case 'TIMELINE':
                    return <GridNoSSR />;
                  case 'LIST':
                    return <ListNoSSR />;
                  default:
                    return null;
                }
              })()}
          </>
        )}
      </Container>
    </>
  );
};

const Loader = () => (
  <SpinnerWrapper>
    <Spinner size="medium" strokeWidth="4px" />
  </SpinnerWrapper>
);

Core.getInitialProps = async (context: NextContext) => {
  const { workspaceId, coreId, tableId, viewId } = context.query;

  return { params: { workspaceId, coreId, tableId, viewId } };
};

const mapState = ({ core }: IRootState) => ({
  isLoadingCore: core.loading.isLoadingCore,
  isLoadingView: core.loading.isLoadingView,
  isLoadingGrid: core.loading.isLoadingGrid,
  activeCore: core.activeCore,
  workspaceId: core.activeIds.workspaceId,
  viewId: core.activeIds.viewId,
  viewOptionsById: core.viewOptions.byId,
});

const mapDispatch = ({ core }: IDispatch) => ({
  getCoreAndView: (payload) => core.getCoreAndView(payload),
  resetInitialState: () => core.resetInitialState(),
  resetStateAndStopSubs: () => core.resetStateAndStopSubs({}),
});

export default connect(
  mapState,
  mapDispatch,
)(Core);
