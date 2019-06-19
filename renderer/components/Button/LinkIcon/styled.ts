import styled from 'styled-components';

import { darkBtnMixin } from '@app/renderer/components/Shared';

export interface IButtonContainer {
  width?: number;
}

export const ButtonContainer = styled.div<IButtonContainer>`
  align-items: center;
  font-size: 14px;
  display: flex;
  justify-content: center;
  outline: none;
  ${darkBtnMixin}
`;
