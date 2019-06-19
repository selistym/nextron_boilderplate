import styled from 'styled-components';

import { modalContainerMixin } from '@app/components/Shared';

export const Container = styled.div`
  box-sizing: border-box;
  max-height: 480px;
  outline: none;
  overflow: auto;
  padding: 24px;
  width: 480px;

  ${modalContainerMixin}
`;

export const ButtonContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  width: 100%;
`;
