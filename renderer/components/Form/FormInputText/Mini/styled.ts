import styled from 'styled-components';

import { COLORS } from '@app/renderer/theme/color';

export const Input = styled.input`
  border: 1px solid ${COLORS.grayBorder};
  border-radius: 8px;
  height: 40px;
  outline: none;
  padding: 3px 15px;
  font-size: 14px;

  &:focus,
  &:active {
    border: 1px solid ${COLORS.blue};
  }
`;
