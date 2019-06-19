import styled, { css } from 'styled-components';

import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.div<{ width: number; height: number }>`
  border: 2px solid ${COLORS.blue};
  border-radius: 2px;
  display: flex;
  cursor: pointer;
  background-color: white;
  outline: none;
  align-items: center;
  justify-content: center;
  z-index: 3;
  position: absolute;
  left: -1px;
  top: -1px;
  width: ${(props) => `${props.width + 2}px`};
  height: ${(props) => `${props.height + 2}px`};
`;

export const IconStyle = css`
  color: ${COLORS.blue};
`;

export const Border = styled.div`
  border: 1px solid ${COLORS.grayDisabled};
  border-radius: 2px;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
