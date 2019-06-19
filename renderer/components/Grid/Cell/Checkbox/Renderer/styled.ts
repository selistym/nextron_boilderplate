import styled, { css } from 'styled-components';

import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const IconStyle = css`
  color: ${COLORS.blue};
`;

export const Border = styled.div`
  border: 1px solid ${COLORS.grayDisabled};
  width: 22px;
  height: 22px;
`;
