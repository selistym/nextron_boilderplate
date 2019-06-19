import styled from 'styled-components';

import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.div`
  display: flex;
  background-color: white;
  width: 100%;
  height: 100%;
`;

export const Input = styled.input`
  border: none;
  box-sizing: border-box;
  color: ${COLORS.grayText};
  font-size: 14px;
  flex: 1;
  width: 50%;
  outline: none;
  padding: 15px;
`;
