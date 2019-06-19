import styled, { css } from 'styled-components';

import {
  darkBtnMixin,
  modalContainerMixin,
  textEllipsisMixin,
  textSharedMixin,
} from '@app/renderer/components/Shared';
import { COLORS } from '@app/renderer/theme/color';

export const Container = styled.div`
  background: white;
  min-width: 400px;
  max-width: 600px;
  ${modalContainerMixin}

  .dropdown-selector-container {
    max-height: ${() => `${5 * 48}px`};
    outline: none;
    overflow: auto;
  }

  .dropdown-selector-option-container {
    align-items: center;
    cursor: pointer;
    display: flex;
    height: 48px;
    width: 100%;
    outline: none;
  }

  .dropdown-selector-option-container.dropdown-selector-option-selected {
    background-color: ${COLORS.blueHover};
  }
`;

export const SelectorOption = styled.div`
  margin: 0px 15px;
  width: 100%;

  ${textSharedMixin}
  ${textEllipsisMixin}
`;

export const ViewBtn = () => css`
  ${darkBtnMixin}
`;
