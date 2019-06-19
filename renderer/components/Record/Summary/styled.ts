import styled, { css } from 'styled-components';

import ButtonIcon from '@app/renderer/components/Button/Icon';
import { COLORS } from '@app/renderer/theme/color';

import { textEllipsisMixin, textSharedMixin } from '@app/renderer/components/Shared';

export const Container = styled.div<{
  isSelected?: boolean;
}>`
  align-items: stretch;
  border: 1px solid ${(props) => (props.isSelected ? COLORS.blue : COLORS.grayDisabled)};
  border-radius: 8px;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 112px;
  margin-bottom: 15px;
  outline: none;
  padding: 10px;
  position: relative;
  width: 100%;

  &:hover {
    border-color: ${(props) => !props.isSelected && COLORS.grayHover};
  }
`;

export const Title = styled.div`
  flex: 1;
  text-align: left;

  ${textSharedMixin}
  ${textEllipsisMixin}
`;

export const OthersContainer = styled.div`
  display: flex;
  flex: 1;
  max-width: 100%;
`;

export const ItemContainer = styled.div`
  margin-right: 20px;
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ItemTitle = styled.div`
  color: ${COLORS.grayText};
  font-size: 12px;
  width: 100%;
  text-align: left;
  margin-bottom: 10px;

  ${textEllipsisMixin}
`;

export const ItemValueMixin = css`
  width: 100%;
`;

export const DeleteIcon = styled(ButtonIcon)`
  border-radius: 12px;
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: ${COLORS.grayDisabled};
  padding: 6px;
`;
