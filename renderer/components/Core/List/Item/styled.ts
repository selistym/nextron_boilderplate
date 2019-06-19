import styled, { css } from 'styled-components';

import { H3Mixin } from '@app/renderer/components/Shared/Typescale';
import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 120px;

  &:hover button {
    visibility: visible;
  }
`;

export const IconContainer = styled.a<{ color: string }>`
  align-items: center;
  background-color: ${(props) => props.color};
  border-radius: 16px;
  color: white;
  cursor: pointer;
  display: flex;
  height: 120px;
  justify-content: center;
  margin-bottom: 20px;
  width: 120px;
`;

export const Name = styled.div`
  color: ${COLORS.purple};
  font-size: 16px;
  font-weight: 500;
  height: 65px;
  width: 100%;
  word-break: break-all;
`;

export const DropdownStyle = css`
  color: ${COLORS.white};
  top: 95px;
  position: absolute;
  right: 5px;
  visibility: hidden;
  width: 20px;
  height: 20px;

  &:hover,
  &:focus {
    color: ${COLORS.white};
    cursor: pointer;
  }

  &:active {
    color: white;
  }
`;

export const H3 = styled.h3`
  ${H3Mixin}
`;

export const WhiteStyle = css`
  color: white;
`;

export const DarkStyle = css`
  color: ${COLORS.grayText};
`;
