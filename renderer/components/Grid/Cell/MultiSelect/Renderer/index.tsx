import { ICellRendererParams } from 'ag-grid-community';

import { IOption } from '@app/renderer/components/Option';
import { StackModalType } from '@app/renderer/constants/modals';

import { createAddButton, createExpandButton, createOption } from '../../shared';

class GridCellMultiSelectRenderer {
  private eGui: HTMLDivElement;
  private params?: ICellRendererParams;

  constructor() {
    this.eGui = document.createElement('div');
    this.eGui.setAttribute('class', 'grid-cell-optional-container');
  }

  public init(params: ICellRendererParams) {
    this.params = params;

    // set add button
    this.setAddButton();

    // set options
    const optionContainer = document.createElement('div');
    optionContainer.setAttribute('class', 'grid-cell-option-container');
    this.eGui.appendChild(optionContainer);
    this.setOptions();

    // set expand button
    this.setExpandButton();
  }

  public getGui() {
    return this.eGui;
  }

  public refresh(params: ICellRendererParams) {
    this.params = params;
    this.setOptions();
  }

  private handleAddButtonClick = () => {
    const { api, rowIndex, column } = this.params!;
    api.startEditingCell({ rowIndex, colKey: column });
  };

  private handleRemove = (e: MouseEvent) => {
    const { node, column } = this.params!;
    const selectedItems = this.getSelectedItems();
    const target = e.currentTarget as HTMLButtonElement;
    const optionId = target.dataset.optionid;
    if (optionId) {
      const newData = selectedItems.filter(({ id }: IOption) => id !== optionId);
      node.setDataValue(column, newData);
    }
  };

  private handleExpand = () => {
    const selectedItems = this.getSelectedItems();
    const { addStackModal, column, data } = this.params!;
    const { colId, headerName, typeOptions } = column.getColDef();

    addStackModal({
      type: StackModalType.Expand,
      props: {
        cell: {
          typeOptions,
          type: 'MULTI_SELECT',
          cellId: '',
          columnId: colId,
          columnName: headerName,
          value: selectedItems,
        },
        isLookup: typeOptions.type === 'LOOKUP',
        rowId: data.id,
      },
    });
  };

  private setAddButton = () => {
    const editable = this.params!.column.getColDef().editable;
    if (editable) {
      const addButtonContainer = document.createElement('div');
      addButtonContainer.setAttribute('class', 'grid-cell-focus-container');
      addButtonContainer.setAttribute('id', 'cell-focus-container');

      const button = createAddButton();
      button.addEventListener('click', this.handleAddButtonClick);

      addButtonContainer.appendChild(button);
      this.eGui.appendChild(addButtonContainer);
    }
  };

  private setOptions() {
    const selectedItems = this.getSelectedItems();
    const optionContainer = this.eGui.querySelector(
      '.grid-cell-option-container',
    ) as HTMLDivElement;
    while (optionContainer.firstChild) {
      optionContainer.removeChild(optionContainer.firstChild);
    }
    selectedItems.forEach((item: IOption) => {
      const option = createOption(item);
      optionContainer.appendChild(option);
    });
  }

  private setExpandButton = () => {
    const expandButtonContainer = document.createElement('div');
    expandButtonContainer.setAttribute('class', 'grid-cell-expand-container');
    expandButtonContainer.setAttribute('id', 'cell-focus-container');

    const expandButton = createExpandButton();
    expandButton.addEventListener('click', this.handleExpand);
    expandButtonContainer.appendChild(expandButton);
    this.eGui.appendChild(expandButtonContainer);
  };

  private getSelectedItems = () => {
    const { value } = this.params!;
    return (value && value.content) || [];
  };
}

export default GridCellMultiSelectRenderer;
