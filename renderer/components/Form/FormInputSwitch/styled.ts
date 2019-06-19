import styled from 'styled-components';

import { textSharedMixin } from '@app/renderer/components/Shared';

import { COLORS } from '@app/renderer/theme/color';

export interface ISwitch {
  isActive?: boolean;
  isDisabled?: boolean;
}

export const Circle = styled.div<ISwitch>`
  background-color: ${(props) => (props.isActive ? COLORS.blue : COLORS.grayText)};
  border-radius: 8px;
  float: right;
  height: 16px;
  width: 16px;
`;

export const CircleContainer = styled.div<ISwitch>`
  align-items: center;
  background-color: ${(props) => (props.isActive ? COLORS.blueLight : COLORS.grayTextDisabled)};
  display: flex;
  height: 4px;
  justify-content: ${(props) => (props.isActive ? 'flex-end' : 'flex-start')};
  width: 28px;
`;

export const SwitchContainer = styled.div`
  align-items: center;
  display: flex;
  height: 20px;
  justify-content: center;

  &:focus {
    ${Circle} {
      background-color: ${COLORS.blueLight};
    }
  }
`;

export const Container = styled.div<ISwitch>`
  align-items: center;
  cursor: pointer;
  display: flex;
  outline: none;
  pointer-events: ${(props) => props.isDisabled && 'none'};
`;

export const Title = styled.div<{ isSmall: boolean }>`
  margin-left: 12px;
  flex: 1;

  ${textSharedMixin}
`;
