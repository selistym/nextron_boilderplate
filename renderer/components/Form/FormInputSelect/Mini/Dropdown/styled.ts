import styled from 'styled-components';

import { modalContainerMixin, textEllipsisMixin } from '@app/renderer/components/Shared';
import { Span2Mixin } from '@app/renderer/components/Shared/Typescale';

import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.div`
  ${modalContainerMixin}
`;

export const OptionContainer = styled.div`
  align-items: center;
  background-color: white;
  cursor: pointer;
  display: flex;
  height: 36px;
  width: 100%;
  outline: none;
  overflow: hidden;

  &:hover {
    background-color: ${COLORS.blueHover};
  }
`;

export const Option = styled.span`
  margin: 0px 15px;
  width: 100%;

  ${Span2Mixin}
  ${textEllipsisMixin}
`;
