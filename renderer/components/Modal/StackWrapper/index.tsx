import FocusTrap from 'focus-trap-react';
import noScroll from 'no-scroll';
import React, { useCallback, useEffect } from 'react';
import { compose } from 'react-apollo';
import { connect } from 'react-redux';

import { KEY_CODES } from '@app/constants/app';

import { IDispatch } from '@app/modules/store';

import { Container, Mask } from './styled';

type IConnectProps = ReturnType<typeof mapDispatch>;

export interface IStackModal {
  modalIndex: number;
  suppressFocusTrap?: boolean;
}

export interface IModalProps extends IConnectProps, IStackModal {
  children: React.ReactElement;
  className?: string;
}

const StackWrapper: React.FC<IModalProps> = ({
  className,
  children,
  removeStackModal,
  modalIndex = 0,
  suppressFocusTrap,
}) => {
  useEffect(() => {
    noScroll.on();
    return () => noScroll.off();
  }, []);

  const zIndex = 1000 + modalIndex;
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.keyCode) {
        case KEY_CODES.ESC:
          removeStackModal();
          break;
        default:
          break;
      }
    },
    [removeStackModal],
  );
  return (
    <>
      <Mask onMouseDown={removeStackModal} style={{ zIndex }} />
      <FocusTrap active={!suppressFocusTrap}>
        <Container
          className={className}
          onKeyDown={handleKeyDown}
          style={{ zIndex }}
          modalIndex={modalIndex}
        >
          {children}
        </Container>
      </FocusTrap>
    </>
  );
};

const mapDispatch = ({ app }: IDispatch) => ({
  removeStackModal: () => app.removeStackModal(),
});

export default compose(
  React.memo,
  connect(
    () => ({}),
    mapDispatch,
  ),
)(StackWrapper);
