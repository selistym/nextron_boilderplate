import styled from 'styled-components';

import { modalContainerMixin } from '@app/renderer/components/Shared';

export const Container = styled.div`
  background: white;
  padding: 16px;
  min-width: 400px;
  max-width: 600px;
  ${modalContainerMixin}
`;

export const BtnContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;
