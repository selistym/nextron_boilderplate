import styled, { css } from 'styled-components';

import { Span2Mixin } from '@app/components/Shared/Typescale';
import { COLORS } from '@app/theme/color';

export const Container = styled.div`
  width: 100%;
`;

export const Option = styled.span`
  ${Span2Mixin}
`;
