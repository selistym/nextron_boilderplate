import styled, { css } from 'styled-components';

import { modalContainerMixin } from '@app/renderer/components/Shared';
import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.div`
  box-sizing: border-box;
  outline: none;
  width: 257px;

  ${modalContainerMixin}
`;

export const TopContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
`;

export const ListContainer = styled.div`
  box-sizing: border-box;
  max-height: 200px;
  margin-top: 10px;
  width: 100%;
  overflow: auto;
  padding: 10px;
`;

export const ButtonContainer = styled.div`
  border-bottom: 1px solid ${COLORS.grayBorder};
  align-items: center;
  padding-bottom: 20px;
  display: flex;
  justify-content: space-around;
`;

export const BottomContainer = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  width: 100%;
`;

export const Input = styled.input`
  background-color: ${COLORS.grayBackground};
  border: none;
  box-sizing: border-box;
  font-size: 14px;
  color: ${COLORS.grayText};
  outline: none;
  height: 40px;
  padding: 5px 15px;
  width: 100%;

  &::-moz-placeholder,
  &::-webkit-input-placeholder {
    font-size: 14px;
    color: ${COLORS.grayText};
  }
`;

export const FormInputSwitchMixin = css`
  margin-bottom: 20px;
`;
