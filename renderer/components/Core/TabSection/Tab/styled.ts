import styled, { css } from 'styled-components';

import { COLORS } from '@app/renderer/theme/color';

interface IContainerMixin {
  activeTab?: boolean;
  isLight?: boolean;
  isFirstTab?: boolean;
  isLastTab?: boolean;
  color?: string;
}

const containerMixin = css<IContainerMixin>`
  align-items: center;
  background: ${(props) => (props.activeTab ? 'white' : 'transparent')};
  border-top-left-radius: 23px;
  border-top-right-radius: 23px;
  border: 1px solid ${COLORS.grayFadedBorder};
  border-bottom: 1px solid ${(props) => (props.activeTab ? 'white' : COLORS.blueHover)};
  cursor: pointer;
  color: ${(props) => (props.activeTab || props.isLight ? COLORS.grayText : COLORS.white)};
  font-size: 14px;
  display: inline-flex;
  flex-shrink: 0;
  font-weight: ${(props) => props.activeTab && 'bold'};
  justify-content: center;
  padding: 7px 30px;
  position: relative;
  z-index: ${(props) => (props.activeTab ? '4' : '0')};

  /* Squares */
  &:before,
  &:after {
    background: ${(props) => (props.activeTab ? 'white' : props.color)};
    bottom: -1px;
    content: '';
    position: absolute;
    height: 15px;
    width: 15px;
  }

  &:before {
    left: -15px;
  }
  &:after {
    right: -15px;
  }

  /* Circles */
  & > form:before,
  & > form:after,
  & > span:before,
  & > span:after {
    margin: 0;
    content: '';
    background: ${(props) => props.color};
    width: 17px;
    height: 15px;
    border-bottom: 1px solid ${COLORS.grayFadedBorder};
    bottom: -1px;
    position: absolute;

    /* Circles over squares */
    z-index: 2;
  }
  & > form:before,
  & > span:before {
    background: ${(props) => props.color};
    border-bottom-right-radius: 90%;
    border-right: 1px solid ${COLORS.grayFadedBorder};
    left: -18px;
  }
  & > form:after,
  & > span:after {
    background: ${(props) => props.color};
    border-bottom-left-radius: 90%;
    border-left: 1px solid ${COLORS.grayFadedBorder};
    right: -18px;
  }
`;

export const Button = styled.button<IContainerMixin>`
  ${containerMixin}

  margin-right: ${(props) => (props.isLastTab ? '15px' : '30px')};
  ${(props) => props.isFirstTab && 'margin-left: 15px'};
`;
