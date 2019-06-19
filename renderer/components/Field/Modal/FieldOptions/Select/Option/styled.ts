import styled from 'styled-components';

import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: 100%;
  height: 36px;
`;

export const DragContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 5px;
`;

export const Color = styled.div<{ color: string }>`
  height: 16px;
  width: 16px;
  border-radius: 8px;
  margin-right: 5px;
  background-color: ${(props) => props.color};
`;

export const Input = styled.input`
  margin-right: 4px;
  padding: 0px 6px;
  color: ${COLORS.grayText};
  outline: none;
  border: none;
  border-radius: 3px;
  flex: 1 1 auto;
  height: 28px;
  font-size: 13px;
  &:focus {
    border: 1px solid ${COLORS.blue};
    padding: 0px 5px;
  }
`;
