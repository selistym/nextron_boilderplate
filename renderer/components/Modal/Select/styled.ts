import styled from 'styled-components';

import { COLORS } from '@app/theme/color';

export const Container = styled.div<{ width?: number }>`
  background-color: white;
  border-radius: 8px;
  overflow: auto;
  outline: none;
  max-height: 200px;
  width: ${(props) => (props.width ? `${props.width}px` : '100%')};
  min-width: 175px;
  max-width: ${(props) => (props.width ? `${props.width}px` : '400px')};
  border: 1px solid ${COLORS.grayDisabled};
  z-index: 1000;
`;

export const Input = styled.input`
  width: 100%;
  outline: none;
  border: none;
  color: ${COLORS.grayText};
  font-size: 14px;
  padding: 5px 10px;
  height: 40px;
  box-sizing: border-box;
`;

export const OptionContainer = styled.div<{
  isSelected?: boolean;
}>`
  background-color: ${(props) => props.isSelected && COLORS.blueHover};
  box-sizing: border-box;
  cursor: pointer;
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
`;

export const Empty = styled.div`
  font-size: 14px;
  color: ${COLORS.grayText};
`;
