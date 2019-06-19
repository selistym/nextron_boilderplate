import styled, { css } from 'styled-components';

import { Span2Mixin } from '@app/components/Shared/Typescale';
import { COLORS } from '@app/theme/color';

export const Container = styled.div`
  border: 1px solid ${COLORS.grayDisabled};
  border-radius: 4px;
  box-sizing: border-box;
  /* cursor: pointer; */
  display: flex;
  height: 75px;
  margin: 10px 0;
  overflow: hidden;
  padding: 16px;
`;

export const UserItemMixin = css`
  flex: 1;
`;

export const ItemRight = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DropdownButton = styled.button`
  align-items: center;
  display: flex;
  cursor: pointer;
`;

export const Auth = styled.span`
  ${Span2Mixin}
  color: ${COLORS.blue};
  margin-right: 5px;
`;

export const AuthIconMixin = css`
  color: ${COLORS.blue};
  margin-right: 5px;
`;

export const DropdownIconMixin = css`
  color: ${COLORS.grayText};
  &:hover {
    color: ${COLORS.purple};
  }
`;

export const Option = styled.span`
  ${Span2Mixin}
`;
