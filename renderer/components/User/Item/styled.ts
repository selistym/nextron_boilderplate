import styled, { css } from 'styled-components';

import { textEllipsisMixin } from '@app/renderer/components/Shared';
import { Span2MediumMixin, Span2Mixin } from '@app/renderer/components/Shared/Typescale';

import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.div`
  align-items: center;
  display: flex;
`;

export const RightContainer = styled.div`
  margin-left: 10px;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const NameMixin = css`
  ${Span2MediumMixin}
  ${textEllipsisMixin};
`;

export const EmailMixin = css`
  margin-top: 5px;

  ${Span2Mixin}
  ${textEllipsisMixin};
`;

export const ShortName = styled.div`
  align-items: center;
  background-color: ${COLORS.red};
  border-radius: 16px;
  color: white;
  display: flex;
  font-size: 14px;
  height: 32px;
  justify-content: center;
  width: 32px;

  ${textEllipsisMixin};
`;
