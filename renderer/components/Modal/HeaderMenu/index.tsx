import { Link, Router } from '@app/renderer/routes';
import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import ThrowWrapper, { IParentModal } from '@app/renderer/components/Modal/ThrowWrapper';
import UserCoreHeader from '@app/renderer/components/User/CoreHeader';
import WorkspaceItem from '@app/renderer/components/Workspace/Item';

import { IDispatch, IRootState } from '@app/renderer/modules/store';

import {
  AccountContainer,
  Container,
  MiddleContainer,
  NavLink,
  WorkspaceContainer,
} from './styled';

type IConnectProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;
interface IProps extends IConnectProps, IParentModal {}

const ModalMenu: React.FC<IProps> = ({
  activeWorkspaceId,
  parentSize,
  offset,
  removeThrowModal,
  workspaceOptions,
}) => {
  const handleClick = useCallback((id) => {
    Router.pushRoute(`/cores/${id}`);
    removeThrowModal();
  }, []);

  const handleClickSettings = useCallback(() => {
    Router.pushRoute(`/settings/workspace/${activeWorkspaceId}`);
    removeThrowModal();
  }, []);

  return (
    <ThrowWrapper parentSize={parentSize} onClose={removeThrowModal} offset={offset}>
      <Container>
        <AccountContainer>
          <UserCoreHeader />
        </AccountContainer>
        <MiddleContainer>
          <NavLink onClick={handleClickSettings} tabIndex={0}>
            <FormattedMessage id="pageAccount.settings" />
          </NavLink>
        </MiddleContainer>
        <WorkspaceContainer>
          {workspaceOptions.allIds.map((id) => (
            <WorkspaceItem
              onClick={handleClick}
              key={id}
              isActive={id === activeWorkspaceId}
              id={id}
              workspaceOption={workspaceOptions.byId[id]}
            />
          ))}
        </WorkspaceContainer>
      </Container>
    </ThrowWrapper>
  );
};

const mapState = (state: IRootState) => ({
  activeWorkspaceId: state.cores.activeWorkspaceId,
  workspaceOptions: state.cores.workspaceOptions,
});

const mapDispatch = ({ app }: IDispatch) => ({
  removeThrowModal: () => app.removeThrowModal(),
});

export default connect(
  mapState,
  mapDispatch,
)(ModalMenu);
