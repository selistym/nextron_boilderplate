import styled, { css } from 'styled-components';

import { textEllipsisMixin } from '@app/renderer/components/Shared';
import { H2Mixin } from '@app/renderer/components/Shared/Typescale';

export const Container = styled.div`
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  min-width: 900px;
`;

export const Title = styled.h2`
  width: 100%;
  margin-bottom: 40px;

  ${H2Mixin}
  ${textEllipsisMixin}
`;

export const ListStyle = css`
  margin: 0 84px 40px 0px;
`;
