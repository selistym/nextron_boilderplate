import styled from 'styled-components';

import { textEllipsisMixin, textSharedMixin } from '@app/renderer/components/Shared';
import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.div<{ isSmall?: boolean }>`
  background-color: white;
  border: 1px solid ${COLORS.grayDisabled};
  border-radius: 8px;
  box-sizing: border-box;
  display: flex;
  height: ${(props) => (props.isSmall ? '32px' : '40px')};
  padding: 3px 15px;
  width: 296px;

  &:active {
    border-color: ${COLORS.blue};
  }
`;

export const Input = styled.input`
  border: none;
  box-sizing: border-box;
  color: ${COLORS.grayText};
  font-size: 14px;
  flex: 1;
  width: 50%;
  outline: none;
  height: 100%;
`;

export const InputTitle = styled.div<{ isSmall?: boolean }>`
  color: ${COLORS.grayText};
  margin-bottom: 12px;

  ${textSharedMixin}
  ${textEllipsisMixin}
`;
