import styled, { css } from 'styled-components';

import { darkBtnMixin } from '@app/renderer/components/Shared';
import { Span2Mixin } from '@app/renderer/components/Shared/Typescale';

export const Container = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 10px;
`;

export const DeleteIconStyle = css`
  padding: 10px 10px 10px 0;
  ${darkBtnMixin}
`;

export const Precursor = styled.span`
  padding: 0 5px;
  ${Span2Mixin}
`;

export const gapRight = css`
  margin-right: 10px;
`;

export const gapRightAndStretch = css`
  display: flex;
  flex: 1;
  margin-right: 10px;
  justify-content: flex-end;
`;
