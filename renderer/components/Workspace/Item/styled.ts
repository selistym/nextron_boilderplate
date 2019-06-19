import styled from 'styled-components';

import { textEllipsisMixin } from '@app/renderer/components/Shared';
import { Span1Mixin } from '@app/renderer/components/Shared/Typescale';
import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.button`
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  padding: 15px;

  &:hover {
    background-color: ${COLORS.blueHover};
  }
`;

export const Color = styled.div<{ color: string }>`
  background-color: ${(props) => props.color || COLORS.blue};
  border-radius: 4px;
  height: 32px;
  width: 32px;
  flex: 0 0 auto;
`;

export const Name = styled.span<{ isActive: boolean }>`
  font-weight: ${(props) => props.isActive && 'bolder'};
  color: ${(props) => (props.isActive ? COLORS.purple : COLORS.grayText)};
  margin-left: 16px;
  text-align: left;

  ${Span1Mixin}
  ${textEllipsisMixin};
`;
