import styled, { css } from 'styled-components';

import { COLORS } from '@app/renderer/theme/color';

import { textEllipsisMixin } from '@app/renderer/components/Shared';
import { H4Mixin } from '@app/renderer/components/Shared/Typescale';

export const Container = styled.div`
  background-color: ${COLORS.white};
  border-bottom: 1px solid ${COLORS.grayDisabled};
  display: flex;
  flex-direction: column;
`;

export const TopContainer = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 78px;
`;

export const H4Style = css`
  flex: 1;

  ${textEllipsisMixin}
  ${H4Mixin}
`;

export const ChildrenContainer = styled.div`
  margin-bottom: 25px;
`;

export const ButtonContainer = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 30px;
`;
