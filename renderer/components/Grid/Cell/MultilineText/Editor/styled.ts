import styled from 'styled-components';

import { COLORS } from '@app/renderer/theme/color';

export const Textarea = styled.textarea<{ left: number; top: number; width: number }>`
  border: 2px solid ${COLORS.blue};
  border-radius: 2px;
  font-size: 14px;
  outline: none;
  padding: 16px 15px 15px 15px;
  resize: none;
  z-index: 3; /* bigger than cell focused css style */
  position: absolute;
  top: -1px;
  left: -1px;
  width: ${(props) => `${props.width + 2}px`};
  height: 200px;
`;
