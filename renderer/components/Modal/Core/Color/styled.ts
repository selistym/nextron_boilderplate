import styled from 'styled-components';

import { COLORS } from '@app/theme/color';

export const Container = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 32px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`;

export const ColorItem = styled.div`
  background-color: ${(props) => props.color};
  border-radius: 4px;
  cursor: pointer;
  height: 36px;
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.white};
`;
