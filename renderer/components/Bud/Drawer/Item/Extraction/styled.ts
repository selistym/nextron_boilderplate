import styled, { css } from 'styled-components';

import { textSharedMixin } from '@app/renderer/components/Shared';

export const RuleBtns = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

export const Title = styled.p`
  margin-bottom: 10px;
  width: 100%;

  ${textSharedMixin}
`;
