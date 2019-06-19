import styled, { css } from 'styled-components';

import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.div`
  align-items: center;
  background-color: ${COLORS.grayBackground};
  border-right: 1px solid ${COLORS.grayBorder};
  height: 40px;
  width: 50px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`;

export const ButtonIconStyle = css`
  padding: 5px;
  width: 100%;
  height: 100%;
`;

export const IconStyle = css`
  color: #3f66f3;
`;
