import styled, { css } from 'styled-components';

import { darkBtnMixin } from '@app/renderer/components/Shared';
import { Span2Mixin } from '@app/renderer/components/Shared/Typescale';
import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.div`
  ${Span2Mixin}

  align-items: center;
  border-top: 1px solid ${COLORS.grayBorder};
  color: ${COLORS.grayText};
  display: flex;
  justify-content: space-between;
  padding: 15px;
`;

export const ButtonContainer = styled.div`
  align-items: center;
  display: flex;
`;

export const BtnStyle = () => css`
  margin-left: 15px;
  ${darkBtnMixin}

  &:hover {
    cursor: pointer;
  }
`;
