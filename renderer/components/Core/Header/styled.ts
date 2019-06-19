import styled from 'styled-components';

import { H2Mixin } from '@app/renderer/components/Shared/Typescale';

const SIDE_SECTION_WIDTH = 200;

export const Container = styled.div`
  display: flex;
  height: 100px;
  padding: 0 68px;
  justify-content: center;
`;

export const LeftSection = styled.div`
  align-items: center;
  display: flex;
  width: ${SIDE_SECTION_WIDTH}px;
`;

export const MidSection = styled.div`
  align-self: center;
  flex: 1;
  display: flex;
  justify-content: center;
`;

export const RightSection = styled.div`
  width: ${SIDE_SECTION_WIDTH}px;
`;

export const H2 = styled.h2`
  ${H2Mixin}
`;
