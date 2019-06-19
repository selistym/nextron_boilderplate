import styled from 'styled-components';

import { COLORS } from '@app/renderer/theme/color';

export const Mask = styled.div`
  background-color: transparent;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  z-index: 200;
`;

export const Container = styled.div<{ left?: number; top?: number }>`
  background-color: ${COLORS.grayBackground};
  bottom: 0;
  position: fixed;
  top: 0;
  right: 0;
  width: 450px;
  z-index: 200;
`;
