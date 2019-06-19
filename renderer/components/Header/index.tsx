import React, { useCallback, useRef } from 'react';
import { compose } from 'react-apollo';
import { connect } from 'react-redux';

import ButtonIcon from '@app/renderer/components/Button/Icon';
import { glyphs } from '@app/renderer/components/Icon';
import UserCoreHeader from '@app/renderer/components/User/CoreHeader';
import { ThrowModalType } from '@app/renderer/constants/modals';

import { IDispatch, IRootState } from '@app/renderer/modules/store';

import { Router } from '@app/renderer/routes';

import { Container, LeftSection, MidSection, RightSection } from './styled';

type IConnectProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

interface IProps extends IConnectProps {
  showAccount: boolean;
}

const Header: React.FC<IProps> = ({ showAccount, addThrowModal, activeWorkspaceId }) => {
  const positionRef = useRef<HTMLDivElement>(null);
  const handleClickLogo = useCallback(
    () => {
      if (Router.router.pathname !== '/cores') {
        Router.pushRoute(`/cores/${activeWorkspaceId}`);
      }
    },
    [activeWorkspaceId, Router],
  );

  return (
    <Container>
      <LeftSection>
        <ButtonIcon
          onClick={handleClickLogo}
          iconProps={{ size: { height: 40, width: 153 }, icon: glyphs.LOGO_FULL_REGULAR }}
        />
      </LeftSection>
      <MidSection />
      <RightSection ref={positionRef}>
        {showAccount && (
          <UserCoreHeader
            onClick={() =>
              addThrowModal({
                type: ThrowModalType.HeaderMenu,
                parentSize: positionRef.current && positionRef.current.getBoundingClientRect(),
                props: { offset: { left: 34, top: 30 } },
              })
            }
          />
        )}
      </RightSection>
    </Container>
  );
};

const mapState = ({ settings }: IRootState) => ({
  activeWorkspaceId: settings.activeWorkspaceId,
});

const mapDispatch = ({ app }: IDispatch) => ({
  addThrowModal: (payload: any) => app.addThrowModal(payload),
});

export default compose(
  React.memo,
  connect(
    mapState,
    mapDispatch,
  ),
)(Header);
