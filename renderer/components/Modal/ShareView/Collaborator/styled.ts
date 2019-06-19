import styled, { css } from 'styled-components';

import { Span2Mixin } from '@app/renderer/components/Shared/Typescale';
import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.div`
  width: 100%;
`;

export const Option = styled.span`
  ${Span2Mixin}
`;
