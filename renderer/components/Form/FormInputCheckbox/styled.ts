import styled from 'styled-components';

import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.div<{ isDisabled?: boolean }>`
  align-items: center;
  border: 1px solid ${COLORS.grayDisabled};
  border-radius: 2px;
  cursor: pointer;
  display: flex;
  height: 20px;
  justify-content: center;
  outline: none;
  pointer-events: ${(props) => props.isDisabled && 'none'};
  width: 20px;

  &:focus {
    border-color: ${COLORS.blueLight};
  }
`;
