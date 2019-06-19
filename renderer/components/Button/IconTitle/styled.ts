import styled from 'styled-components';

import { COLORS } from '@app/renderer/theme/color';

export interface IButtonContainer {
  width?: number;
}

export const ButtonContainer = styled.button<IButtonContainer>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: ${COLORS.blue};

  &:active,
  &:hover,
  &:focus {
    color: ${COLORS.blueDark};
    cursor: pointer;
  }
`;
