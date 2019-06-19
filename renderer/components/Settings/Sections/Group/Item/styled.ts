import styled, { css } from 'styled-components';

import { textEllipsisMixin } from '@app/renderer/components/Shared';
import { Span2MediumMixin, Span2Mixin } from '@app/renderer/components/Shared/Typescale';
import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.div`
  border: 1px solid ${COLORS.grayDisabled};
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  overflow: hidden;
  width: 100%;

  &:hover {
    border: 1px solid ${COLORS.blue};
  }
`;

export const Color = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  flex: 0 0 auto;
  width: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 25px;
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: calc(100% - 55px);
  box-sizing: border-box;
`;

export const FirstLine = styled.div`
  display: flex;
  align-items: center;
`;

export const NameMixin = css`
  color: ${COLORS.purple};
  flex: 1;
  padding: 2px 0;

  ${Span2MediumMixin}
  ${textEllipsisMixin};
`;

export const memberMixin = css`
  padding: 2px 0;

  ${Span2Mixin}
  ${textEllipsisMixin};
`;

export const coreNumberMixin = css`
  color: ${COLORS.blue};
  padding: 2px 0;

  ${Span2Mixin}
  ${textEllipsisMixin};
`;
