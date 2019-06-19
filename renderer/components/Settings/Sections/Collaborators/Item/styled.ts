import styled, { css } from 'styled-components';

import { textEllipsisMixin } from '@app/renderer/components/Shared';
import { Span2Mixin } from '@app/renderer/components/Shared/Typescale';
import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.div`
  border: 1px solid ${COLORS.grayDisabled};
  border-radius: 4px;
  box-sizing: border-box;
  /* cursor: pointer; */
  display: flex;
  height: 75px;
  overflow: hidden;
  padding: 16px;
  width: 100%;

  /* &:hover {
    border: 1px solid ${COLORS.blue};
  } */
`;

export const UserItemMixin = css`
  flex: 1;
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const coreNumberMixin = css`
  ${Span2Mixin}
  ${textEllipsisMixin};

  color: ${COLORS.blue};
`;
