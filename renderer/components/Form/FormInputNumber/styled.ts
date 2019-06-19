import styled, { css } from 'styled-components';

import { COLORS } from '@app/renderer/theme/color';

import { textEllipsisMixin, textSharedMixin } from '@app/renderer/components/Shared';

export const InputContainer = styled('div')`
  position: relative;
  width: 100%;
`;

export const InputTitle = styled.div<{ isSmall?: boolean }>`
  color: ${COLORS.grayText};
  margin-bottom: 12px;

  ${textSharedMixin}
  ${textEllipsisMixin}
`;

export const Input = styled.input<{
  isSmall?: boolean;
  isDisabled?: boolean;
  isError?: boolean;
  isFocused?: boolean;
}>`
  border: 1px solid;
  border-radius: 8px;
  height: ${(props) => (props.isSmall ? '32px' : '40px')};
  margin-bottom: 25px;
  outline: none;
  padding: 3px 15px;
  width: calc(100% - 32px);

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
  }

  ${textSharedMixin}

  ${(props) => props.isFocused && isInputFocused};
  ${(props) => props.isError && isInputError};
  ${(props) => props.isDisabled && isInputDisabled};
  ${(props) => !props.isDisabled && !props.isError && !props.isFocused && isInputNormal}
`;

const isInputNormal = css`
  background-color: white;
  border-color: ${COLORS.grayDisabled};
`;

const isInputFocused = css`
  background-color: white;
  border-color: ${COLORS.blue};
`;

const isInputError = css`
  background-color: white;
  border-color: ${COLORS.red};
`;

const isInputDisabled = css`
  background-color: rgba(255, 255, 255, 0.5);
  border-color: ${COLORS.grayLightDisabled};
  color: ${COLORS.grayTextDisabled};
`;
