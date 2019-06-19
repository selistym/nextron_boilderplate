import { ICellRendererParams } from 'ag-grid-community';

import { IOption } from '@app/renderer/components/Option';

import { createOption } from '../../shared';

class GridCellMultiSelectRenderer {
  private eGui: HTMLDivElement;

  constructor() {
    this.eGui = document.createElement('div');
    this.eGui.setAttribute('class', 'grid-cell-clickable-container');

    const optionContainer = document.createElement('div');
    optionContainer.setAttribute('class', 'grid-cell-option-container');

    const focusContainer = document.createElement('div');
    focusContainer.setAttribute('id', 'cell-focus-container');
    focusContainer.innerHTML = `
      <svg class="grid-cell-arrow-down" viewbox="0 0 9 5" width="10" height="10" xmlns="http://www.w3.org/2000/svg">
        <path d="M.25.75L4.625 4.5 9 .75z" fill="currentColor" fillRule="evenodd" />
      </svg>
    `;

    this.eGui.appendChild(optionContainer);
    this.eGui.appendChild(focusContainer);
  }

  public init(params: ICellRendererParams) {
    const { value } = params;
    this.setOption(value && value.content);
  }

  public getGui() {
    return this.eGui;
  }

  public refresh(params: ICellRendererParams) {
    const { value } = params;
    this.setOption(value && value.content);
  }

  private setOption(selectedItem: IOption) {
    const optionContainer = this.eGui.querySelector(
      '.grid-cell-option-container',
    ) as HTMLDivElement;
    while (optionContainer.firstChild) {
      optionContainer.removeChild(optionContainer.firstChild);
    }
    if (!selectedItem) return;
    const option = createOption(selectedItem);
    optionContainer.appendChild(option);
  }
}

export default GridCellMultiSelectRenderer;
