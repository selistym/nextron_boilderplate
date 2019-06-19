import styled from 'styled-components';

import { textEllipsisMixin } from '@app/renderer/components/Shared';
import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  box-sizing: border-box;
  height: 24px;
  border-radius: 12px;
  min-width: 24px;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 10px;
  flex-shrink: 0;
`;

export const Name = styled.div`
  font-size: 10px;
  color: ${COLORS.grayText};

  ${textEllipsisMixin}
`;
