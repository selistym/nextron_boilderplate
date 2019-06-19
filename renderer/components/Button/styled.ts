import styled, { css } from 'styled-components';

import { COLORS } from '@app/renderer/theme/color';

export interface IButtonContainer {
  isDisabled?: boolean;
  isLoading?: boolean;
  isSecondary?: boolean;
  isSmall?: boolean;
  isFullWidth?: boolean;
  width?: number;
}

const isMainPrimaryMixin = css`
  background-color: ${COLORS.blue};
  color: ${COLORS.white};

  &:hover,
  &:focus {
    background-color: ${COLORS.blueLight};
    cursor: pointer;
  }
  &:active {
    background-color: ${COLORS.blueDark};
  }
`;

const isSecondaryPrimaryMixin = css`
  border: 1px solid ${COLORS.blue};
  color: ${COLORS.blue};

  &:hover,
  &:focus {
    border: 1px solid ${COLORS.blueLight};
    color: ${COLORS.blueLight};
    cursor: pointer;
  }
  &:active {
    border: 2px solid ${COLORS.blueLight};
    color: ${COLORS.blueDark};
  }
`;

const isMainDisabledMixin = css`
  background-color: ${COLORS.grayDisabled};
  border: 1px solid ${COLORS.grayDisabled};
  color: ${COLORS.grayText};
  cursor: inherit;
`;

const isSecondaryDisabledMixin = css`
  background-color: 'white';
  border: 1px solid ${COLORS.grayDisabled};
  color: ${COLORS.grayText};
  cursor: inherit;
`;

const isMainLoadingMixin = () => css`
  background-color: ${COLORS.blue};
  color: ${COLORS.white};
  cursor: 'inherit';
  pointer-events: 'none';
`;

const isMainMixin = css<IButtonContainer>`
  ${(props) => props.isDisabled && isMainDisabledMixin}
  ${(props) => props.isLoading && isMainLoadingMixin}
  ${(props) => !props.isDisabled && !props.isLoading && isMainPrimaryMixin}
`;

const isSecondaryMixin = css<IButtonContainer>`
  ${(props) => props.isDisabled && isSecondaryDisabledMixin}
  ${(props) =>
    !props.isDisabled && !props.isLoading && isSecondaryPrimaryMixin}
`;

export const ButtonContainer = styled.button<IButtonContainer>`
  align-items: center;
  border-radius: 24px;
  border: none;
  font-family: Galano Grotesque;
  font-size: ${(props) => (props.isSmall ? '14px' : '16px')};
  display: flex;
  outline: none;
  justify-content: center;
  height: ${(props) => (props.isSmall ? '40px' : '48px')};
  width: ${(props) => (props.width ? `${props.width}px` : props.isSmall ? '188px' : '240px')};
  ${(props) => props.isFullWidth && 'width: 100%'};
  ${(props) => (props.isSecondary ? isSecondaryMixin : isMainMixin)}
`;
