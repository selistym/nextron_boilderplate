import styled, { css } from 'styled-components';

import { textEllipsisMixin } from '@app/renderer/components/Shared';
import { Label1Mixin } from '@app/renderer/components/Shared/Typescale';

import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.div`
  align-items: center;
  display: flex;
  padding-left: 15px;
  padding-right: 15px;
  width: 100%;
`;

export const ColumnTitle = styled.label`
  color: ${COLORS.grayText};
  flex: 1;
  text-transform: uppercase;
  width: 100%;

  ${Label1Mixin}
  ${textEllipsisMixin}
`;

export const DropdownIcon = css`
  height: 20px;
`;
