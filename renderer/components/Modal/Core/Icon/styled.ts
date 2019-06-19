import styled from 'styled-components';

import { COLORS } from '@app/theme/color';

export const Container = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 28px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`;

export const IconItem = styled.div<{ isSelected: boolean }>`
  background-color: ${(props) => props.isSelected && COLORS.blueHover};
  border-radius: 4px;
  color: ${COLORS.grayText};
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
