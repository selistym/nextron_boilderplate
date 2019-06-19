import styled from 'styled-components';

import { textEllipsisMixin } from '@app/renderer/components/Shared';
import { Span2Mixin } from '@app/renderer/components/Shared/Typescale';

export const Container = styled.div`
  align-items: center;
  display: flex;
`;

export const Span = styled.span`
  width: 100%;
  ${Span2Mixin}
  ${textEllipsisMixin}
`;
