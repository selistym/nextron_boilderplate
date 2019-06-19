import styled, { css } from 'styled-components';

import Icon from '@app/renderer/components/Icon';
import { Span2Mixin } from '@app/renderer/components/Shared/Typescale';
import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.div`
  background-color: white;
  border: 1px solid ${COLORS.grayDisabled};
  border-radius: 8px;
  outline: none;
  overflow: hidden;
  position: relative;
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

export const FilteredOptionContainer = styled.div`
  background-color: white;
  overflow: auto;
  max-height: 351px;
`;

export const Option = styled.button<{ isSelected: boolean }>`
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  outline: none;
  border: none;
  text-align: left;
  padding: 8px;
  width: 100%;
  height: 36px;
  background-color: ${(props) => (props.isSelected ? COLORS.blueHover : COLORS.white)};
`;

export const OptionIcon = styled(Icon)`
  margin-right: 8px;
  color: ${(props) => COLORS.grayText};
`;

export const OptionName = styled.span`
  margin: 0;
  color: ${(props) => COLORS.grayText};
  ${Span2Mixin}
`;

export const IconClose = css`
  position: absolute;
  right: 10px;
  top: 13px;
  width: 15px;
  height: 15px;
`;
