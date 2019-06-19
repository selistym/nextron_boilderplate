import styled from 'styled-components';

import { textEllipsisMixin, textSharedMixin } from '@app/renderer/components/Shared';

import { COLORS } from '@app/renderer/theme/color';

export const DropdownContainer = styled.div<{ isSmall?: boolean; isError?: boolean }>`
  .dropdown-selector-container {
    background-color: white;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border: 1px solid ${(props) => (props.isError ? COLORS.red : COLORS.blue)};
    border-top: none;
    left: 0px;
    max-height: ${(props) => `${5 * (props.isSmall ? 40 : 48)}px`};
    outline: none;
    overflow: auto;
    position: absolute;
    right: 0px;
    z-index: 1000;
  }

  .dropdown-selector-option-container {
    align-items: center;
    cursor: pointer;
    display: flex;
    height: ${(props) => (props.isSmall ? '40px' : '48px')};
    width: 100%;
    outline: none;
  }

  .dropdown-selector-option-container.dropdown-selector-option-selected {
    background-color: ${COLORS.blueHover};
  }

  .dropdown-selector-option {
    margin: 0px 15px;
    width: 100%;

    ${textSharedMixin}
    ${textEllipsisMixin}
  }
`;
