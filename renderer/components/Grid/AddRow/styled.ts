import styled, { css } from 'styled-components';

import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.div``;

export const Button = styled.button`
  padding: 18px;
  width: 100%;

  &:hover {
    background-color: ${COLORS.grayHover};
    cursor: pointer;
  }
`;

export const IconStyle = css`
  color: ${COLORS.blue};
`;
