import styled from 'styled-components';

import { textEllipsis } from '@app/renderer/components/Shared';
import { COLORS } from '@app/renderer/theme/color';

export const Span = styled.span`
  color: ${COLORS.grayText};
  font-size: 14px;
  padding: 15px;
  text-align: left;

  ${textEllipsis};
`;
