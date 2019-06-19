import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { IDispatch, IRootState } from '@app/renderer/modules/store';

import Drawer from '@app/renderer/components/Drawer';
import Spinner from '@app/renderer/components/Loading/Spinner';
import { StackModalType } from '@app/renderer/constants/modals';
import BudDrawerFooter from './Footer';
import BudDrawerHeader from './Header';
import BudDrawerItem from './Item';

import { ContentContainer, drawerMixin, SpinnerWrapper } from './styled';

type IConnectProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const BudDrawer: React.FC<IConnectProps> = ({
  addStackModal,
  budInstanceRows,
  closeCoreBud,
  isDrawerOpen,
  isLoading,
  getCoreBuds,
}) => {
  useEffect(
    () => {
      if (isDrawerOpen) getCoreBuds();
    },
    [isDrawerOpen],
  );

  return (
    <>
      {isDrawerOpen && (
        <Drawer onClose={closeCoreBud} css={drawerMixin}>
          <BudDrawerHeader onClose={closeCoreBud} />
          <ContentContainer>
            {isLoading ? (
              <SpinnerWrapper>
                <Spinner size="medium" strokeWidth="4px" />
              </SpinnerWrapper>
            ) : (
              budInstanceRows.allIds.map((rowId) => (
                <BudDrawerItem key={rowId} budRow={budInstanceRows.byId[rowId]} />
              ))
            )}
          </ContentContainer>
          <BudDrawerFooter onAddBudClick={addStackModal} />
        </Drawer>
      )}
    </>
  );
};

const mapState = ({ coreBuds }: IRootState) => ({
  isDrawerOpen: coreBuds.isDrawerOpen,
  isLoading: coreBuds.loading.isLoading,
  budInstanceRows: coreBuds.budInstanceRows,
});

const mapDispatch = ({ app, coreBuds }: IDispatch) => ({
  addStackModal: () => app.addStackModal({ type: StackModalType.AddCoreBud }),
  closeCoreBud: () => coreBuds.setIsDrawerOpen(false),
  getCoreBuds: () => coreBuds.getCoreBuds(null),
});

export default connect(
  mapState,
  mapDispatch,
)(BudDrawer);
