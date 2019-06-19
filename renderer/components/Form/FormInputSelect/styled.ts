import styled from 'styled-components';

import Icon from '@app/renderer/components/Icon';
import { textEllipsisMixin, textSharedMixin } from '@app/renderer/components/Shared';

import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.div`
  position: relative;
  width: 100%;
`;

export const Title = styled.p<{ isSmall?: boolean }>`
  margin-bottom: 12px;
  width: 100%;

  ${textSharedMixin}
`;

export const Select = styled.div<{ isSmall?: boolean; isOpen?: boolean; isError?: boolean }>`
  background-color: white;
  border: 1px solid
    ${(props: any) =>
      props.isError ? COLORS.red : props.isOpen ? COLORS.blue : COLORS.grayDisabled};
  border-bottom-left-radius: ${(props) => (props.isOpen ? '0' : '8px')};
  border-bottom-right-radius: ${(props) => (props.isOpen ? '0' : '8px')};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-color: ${(props) => props.isOpen && 'transparent'};
  box-sizing: border-box;
  cursor: pointer;
  height: ${(props) => (props.isSmall ? '40px' : '48px')};
  outline: none;
  pointer-events: ${(props: any) => (props.isOpen ? 'none' : 'inherit')};
  width: 100%;

  &:focus {
    border: 1px solid ${COLORS.blue};
  }
`;

export const ValueContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  width: 100%;
`;

export const Value = styled.p<{ isSmall?: boolean }>`
  margin: 0px 10px 0px 15px;
  flex: 1;

  ${textSharedMixin}
  ${textEllipsisMixin}
`;

export const StyledIcon = styled(Icon)<{ isOpen: boolean }>`
  fill: ${COLORS.grayText};
  margin-right: 10px;
  transform: ${(props) => (props.isOpen ? 'rotate(0.5turn)' : 'rotate(0)')};
`;
