import { SELECT_COLOR } from '@app/renderer/constants/color';
import styled from 'styled-components';

import { textEllipsisMixin } from '@app/renderer/components/Shared';
import { COLORS } from '@app/renderer/theme/color';

import { IOption } from '@app/renderer/components/Option';

export const Span = styled.span`
  color: ${COLORS.grayText};
  font-size: 14px;
  padding: 15px;
  text-align: left;

  ${textEllipsisMixin};
`;

export const createOption = (
  { id, name, color }: IOption,
  onRemove?: (e: MouseEvent) => void,
  onClick?: (e: MouseEvent) => void,
) => {
  const option = document.createElement('div');
  option.setAttribute('class', 'grid-cell-option');
  option.setAttribute('style', `background-color:${SELECT_COLOR[color]}`);
  const optionName = document.createElement('div');
  optionName.setAttribute('class', 'grid-cell-option-name');
  optionName.innerText = name;
  option.appendChild(optionName);

  if (onClick) {
    option.setAttribute('data-optionid', id);
    option.addEventListener('click', onClick);
    option.setAttribute('class', 'grid-cell-option-clickable');
  }

  if (onRemove) {
    const svg = `
      <svg viewBox="-1 0 16 16" width="10" height="10" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13.3.71a.996.996 0 0 0-1.41 0L7 5.59 2.11.7A.996.996 0 1 0 .7 2.11L5.59 7 .7 11.89a.996.996 0 1 0 1.41 1.41L7 8.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L8.41 7l4.89-4.89c.38-.38.38-1.02 0-1.4z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </svg>
    `;

    const focusContainer = document.createElement('div');
    focusContainer.setAttribute('id', 'cell-focus-container');
    const button = document.createElement('button');
    button.setAttribute('class', 'grid-cell-option-remove');
    button.innerHTML = svg;
    button.setAttribute('data-optionid', id);
    button.addEventListener('click', onRemove);

    focusContainer.appendChild(button);
    option.appendChild(focusContainer);
  }

  return option;
};

export const createAddButton = () => {
  const svg = `
    <svg viewBox="0 0 34 34" width="10" height="10" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd">
        <path d="M-5-5h40v40H-5z" />
        <path
          d="M29.837 15.012a1.66 1.66 0 0 0-1.661-1.662l-11.514-.012V1.812A1.66 1.66 0 0 0 15 .151a1.66 1.66 0 0 0-1.662 1.661v11.526H1.812A1.66 1.66 0 0 0 .151 15c0 .92.742 1.662 1.661 1.662h11.526v11.526c0 .919.743 1.661 1.662 1.661a1.66 1.66 0 0 0 1.662-1.661V16.662h11.526a1.67 1.67 0 0 0 1.65-1.65z"
          fill="currentColor"
        />
      </g>
    </svg>
  `;
  const button = document.createElement('button');
  button.setAttribute('class', 'grid-cell-add-button');
  button.innerHTML = svg;
  return button;
};

export const createExpandButton = () => {
  const svg = `
    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
      <g fill="colorColor" fillRule="evenodd">
        <rect fill="#3F66F3" fillRule="nonzero" width="16" height="16" rx="4" />
        <path fill="#F6F4F1" d="M4.818 7l.303 3.94 3.94.303zM11.243 9.06l-.303-3.939L7 4.818z" />
      </g>
    </svg>
  `;

  const button = document.createElement('button');
  button.setAttribute('class', 'grid-cell-expand-button');
  button.innerHTML = svg;
  return button;
};
