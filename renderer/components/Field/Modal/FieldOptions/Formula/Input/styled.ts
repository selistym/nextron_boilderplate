import styled from 'styled-components';

import { textEllipsisMixin } from '@app/renderer/components/Shared';
import { COLORS } from '@app/renderer/theme/color';

export const Input = styled.input`
  height: 22px;
  padding: 8px 5px;
  border-radius: 5px;
  border: 1px solid ${COLORS.grayDisabled};
  color: ${COLORS.blueLight};
  &:focus {
    border: 1px solid ${COLORS.blue};
  }
  outline: none;
  width: calc(100% - 14px);
`;

export const MiddleTitle = styled.div`
  padding: 4px 4px;
  font-size: 12px;
  height: 18px;
  color: ${COLORS.grayText};
  display: flex;
  align-items: center;
`;

export const OptionContainer = styled.div`
  max-height: 350px;
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background-color: white;
  border: 1px solid ${COLORS.grayDisabled};
`;

export const ItemContainer = styled.button<{
  selected: boolean;
}>`
  cursor: pointer;
  outline: none;
  padding: 4px;
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.selected ? COLORS.blueHover : COLORS.white)};
  flex: 1 0 32px;
`;

export const ItemName = styled.div<{
  type: string;
}>`
  flex: 1 1 auto;
  padding: 0 4px;
  font-size: 12px;
  display: flex;
  align-items: center;
  color: ${(props) => (props.type === 'function' ? COLORS.blueLight : COLORS.grayText)};

  ${textEllipsisMixin}
`;

export const ItemType = styled.div`
  font-size: 12px;
  color: ${(props) => COLORS.grayText};
`;
