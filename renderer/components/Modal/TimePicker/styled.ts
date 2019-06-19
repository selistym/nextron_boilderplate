import styled from 'styled-components';

import { textEllipsisMixin } from '@app/renderer/components/Shared';
import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.div<{ width?: number }>`
  background-color: white;
  border: 1px solid ${COLORS.grayTextDisabled};
  box-sizing: border-box;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  max-height: 230px;
  width: ${(props) => `${props.width}px`};
  outline: none;
  overflow: auto;
  padding: 15px;
`;

export const Item = styled.div`
  font-size: 14px;
  color: ${COLORS.grayText};
  cursor: pointer;
  text-align: center;
  flex: 1 0;
  padding: 8px 0px;

  ${textEllipsisMixin};
`;
