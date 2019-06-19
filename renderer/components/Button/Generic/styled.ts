import styled from 'styled-components';

import { COLORS } from '@app/renderer/theme/color';

export interface IButtonContainer {
  width?: number;
}

export const ButtonContainer = styled.button<IButtonContainer>`
  font-size: 14px;
  color: ${COLORS.grayText};

  &:hover,
  &:focus {
    color: ${COLORS.blueLight};
    cursor: pointer;
  }
  &:active {
    color: ${COLORS.blueDark};
  }
`;
