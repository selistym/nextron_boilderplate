import styled, { css } from 'styled-components';

import { textEllipsisMixin } from '@app/renderer/components/Shared';
import { H2Mixin } from '@app/renderer/components/Shared/Typescale';
import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const Color = styled.div<{ color: string }>`
  background-color: ${(props) => props.color || COLORS.blue};
  border-radius: 4px;
  height: 32px;
  width: 32px;
  flex: 0 0 auto;
`;

export const TitleMixin = css`
  margin-left: 16px;
  text-align: left;

  ${textEllipsisMixin};
  ${H2Mixin}
`;

export const EditIconStyle = css`
  margin-left: 23px;
`;
