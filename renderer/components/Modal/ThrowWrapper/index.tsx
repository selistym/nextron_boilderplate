import FocusTrap from 'focus-trap-react';
import noScroll from 'no-scroll';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ClickOutside from 'react-outside-click-handler';

import { KEY_CODES } from '@app/renderer/constants/app';

import { leftPosWithinView, topPosWithinView } from '@app/renderer/utils/calculations';

import { Container } from './styled';

export interface IParentModal {
  parentSize?: any;
  onClose: () => void;
  offset?: IOffset;
  avoidCollision?: boolean;
  avoidElementVert?: boolean;
  avoidClickoutSide?: boolean;
  suppressFocusTrap?: boolean;
}
export interface IModalProps extends IParentModal {
  children: React.ReactElement;
  className?: string;
}
interface IOffset {
  left?: number;
  top?: number;
}

const ThrowWrapper: React.FC<IModalProps> = ({
  avoidCollision = false,
  avoidElementVert = false,
  avoidClickoutSide = false,
  className,
  children,
  parentSize,
  suppressFocusTrap = false,
  onClose,
  offset,
}) => {
  const [childSize, setChildSize] = useState(null);
  const childRef = useRef(null);
  useEffect(() => {
    noScroll.on();
    setChildSize(childRef.current && childRef.current.focusTrapElement.getBoundingClientRect());
    return () => noScroll.off();
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.keyCode) {
        case KEY_CODES.ESC:
          onClose();
          break;
        default:
          break;
      }
    },
    [onClose],
  );
  const { left, top } = getPos(parentSize, childSize, avoidCollision, avoidElementVert, offset);

  return (
    <ClickOutside
      onOutsideClick={() => {
        if (!avoidClickoutSide) onClose();
      }}
    >
      <FocusTrap active={!suppressFocusTrap} ref={childRef}>
        <Container
          style={{ left: `${left}px`, top: `${top}px` }}
          className={className}
          onKeyDown={handleKeyDown}
        >
          {children}
        </Container>
      </FocusTrap>
    </ClickOutside>
  );
};

const getPos = (
  parentSize: any,
  childSize: any,
  avoidCollision: boolean,
  avoidElementVert: boolean,
  offset: IOffset | undefined,
) => {
  /**
   * MAJOR hack alert. I can't get the childSize until the component has mounted. I need the height and width. So basically
   * right when it mounts, I'm throwing it as far as the moon. And once i set the state for childRef, I return it back home.
   */

  if (!childSize) return { left: -1000, top: -1000 };
  const left = parentSize
    ? leftPosWithinView(parentSize, childSize, avoidCollision, offset && offset.left)
    : (window.innerWidth - childSize.width) / 2 + (offset && offset.left ? offset.left : 0);
  const top = parentSize
    ? topPosWithinView(
        parentSize,
        childSize,
        avoidCollision,
        avoidElementVert,
        offset && offset.top,
      )
    : (window.innerHeight - childSize.height) / 2 + (offset && offset.top ? offset.top : 0);

  return { left, top };
};

export default ThrowWrapper;
