import styled from 'styled-components';

import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.div``;

export const TopContainer = styled.div`
  align-items: center;
  border-bottom: 1px solid ${COLORS.grayDisabled};
  display: flex;
  margin: 0 16px;
  padding-bottom: 16px;
`;

export const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 200px;
  overflow: auto;
  padding: 0px 16px;
`;

export const BottomContainer = styled.div`
  padding: 10px 16px;
`;

export const Empty = styled.div`
  text-align: center;
  font-size: 14px;
  color: ${COLORS.grayText};
  padding: 8px 0px;
`;
