import styled from 'styled-components';

import { COLORS } from '@app/renderer/theme/color';

export const Input = styled.input`
  border: none;
  box-sizing: border-box;
  color: ${COLORS.grayText};
  font-size: 14px;
  height: 100%;
  outline: none;
  padding: 15px;
  width: 100%;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
  }
`;
