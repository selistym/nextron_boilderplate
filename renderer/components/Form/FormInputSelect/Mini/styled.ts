import styled from 'styled-components';

import Icon from '@app/renderer/components/Icon';
import { textEllipsisMixin } from '@app/renderer/components/Shared';
import { Span2Mixin } from '@app/renderer/components/Shared/Typescale';

import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.div`
  position: relative;
  min-width: 40px;
`;

export const OptionBtn = styled.button`
  align-items: center;
  background-color: white;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  height: 30px;
  outline: none;

  &:hover {
    background-color: ${COLORS.blueHover};
  }
`;

export const Value = styled.span`
  margin: 0px 10px;
  flex: 1;

  ${Span2Mixin}
  ${textEllipsisMixin}
`;

export const StyledIcon = styled(Icon)<{ isOpen: boolean }>`
  color: ${COLORS.purple};
  margin-right: 10px;
  transform: ${(props) => (props.isOpen ? 'rotate(0.5turn)' : 'rotate(0)')};
`;
