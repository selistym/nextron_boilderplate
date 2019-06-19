import styled from 'styled-components';

import { darkBtnMixin } from '@app/renderer/components/Shared';

export interface IButtonContainer {
  width?: number;
}

export const ButtonContainer = styled.button<IButtonContainer>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  ${darkBtnMixin}
`;
