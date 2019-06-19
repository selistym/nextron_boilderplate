import styled, { css } from 'styled-components';

import { textEllipsisMixin, textSharedMixin } from '@app/renderer/components/Shared';
import { COLORS } from '@app/renderer/theme/color';

export const InputContainer = styled('div')`
  position: relative;
  width: 100%;
`;

export const InputTitle = styled.div`
  margin-bottom: 12px;

  ${textEllipsisMixin}
  ${textSharedMixin}
`;

export const TextArea = styled.textarea<{
  isSmall?: boolean;
  isDisabled?: boolean;
  isError?: boolean;
  isFocused?: boolean;
}>`
  border: 1px solid;
  border-radius: 8px;
  height: ${(props) => (props.isSmall ? '150px' : '200px')};
  margin-bottom: 20px;
  outline: none;
  padding: 15px 15px;
  resize: none;
  width: calc(100% - 32px);

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
