import styled from 'styled-components';

import { textEllipsisMixin } from '@app/renderer/components/Shared';
import { Span1Mixin } from '@app/renderer/components/Shared/Typescale';

export const Container = styled.div<{ isDisabled: boolean }>`
  align-items: center;
  cursor: pointer;
  pointer-events: ${(props) => (props.isDisabled ? 'none' : 'initial')};
  display: flex;
  justify-content: center;
`;

export const AccountNameStyle = styled.span`
  margin-right: 8px;
  ${Span1Mixin}
  ${textEllipsisMixin};
`;
