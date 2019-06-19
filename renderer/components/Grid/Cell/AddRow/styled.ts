import styled, { css } from 'styled-components';

import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.div`
  padding: 20px;
`;

export const btnMixin = css`
  color: ${COLORS.blue};
`;
