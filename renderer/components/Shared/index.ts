import { css } from 'styled-components';

import { COLORS } from '@app/renderer/theme/color';

export const textEllipsisMixin = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const textSharedMixin = css<{ isSmall?: boolean }>`
  color: ${COLORS.grayText};
  font-size: ${(props) => (props.isSmall ? '14px' : '16px')};
`;

export const darkBtnMixin = css`
  color: ${COLORS.grayText};

  &:hover,
  &:focus {
    color: ${COLORS.purple};
    cursor: pointer;
  }

  &:active {
    color: black;
  }
`;

export const blueBtnMixin = css`
  color: ${COLORS.blue};

  &:hover,
  &:focus {
    cursor: pointer;
    color: ${COLORS.blueDark};
  }
`;

export const whiteBtnMixin = css`
  color: ${COLORS.white};

  &:hover,
  &:focus {
    cursor: pointer;
    color: ${COLORS.grayLightDisabled};
  }
`;

export const modalContainerMixin = css`
  background-color: ${COLORS.white};
  border: solid 1px ${COLORS.grayBorder};
  border-radius: 8px;
  box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.2);
`;
