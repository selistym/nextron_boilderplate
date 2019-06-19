import styled from 'styled-components';

import { Span2Mixin } from '@app/renderer/components/Shared/Typescale';
import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.div`
  background-color: ${COLORS.white};
  border: 1px solid ${COLORS.grayDisabled};
  border-radius: 6px;
  height: 524px;
  outline: none;
  overflow: auto;
  padding: 20px;
  width: 632px;
`;

export const SpinnerOrEmptyContaienr = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const Empty = styled.span`
  ${Span2Mixin}
`;
