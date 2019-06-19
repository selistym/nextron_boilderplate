import { ICellRendererParams } from 'ag-grid-community';

import { IAdaptedAttachment } from '@app/renderer/types';

import { StackModalType } from '@app/renderer/constants/modals';

import { createAddButton, createExpandButton } from '../../shared';

class GridCellAttachmentRenderer {
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

  private handleExpand = () => {
    const selectedItems = this.getSelectedItems();
    const { addStackModal, column, data } = this.params!;
    const { colId, headerName, typeOptions } = column.getColDef();

    addStackModal({
      type: StackModalType.Expand,
      props: {
        cell: {
          typeOptions,
          type: 'MULTI_ATTACHMENT',
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

  private handleClickOption = (e: MouseEvent) => {
    const selectedItems = this.getSelectedItems();
    const { addStackModal, removeStackModal } = this.params!;
    const target = e.currentTarget as HTMLDivElement;
    const index = target.dataset.index;
    if (!index) return;
    addStackModal({
      type: StackModalType.Preview,
      props: {
        attachments: selectedItems,
        onExit: removeStackModal,
        defaultIndex: parseInt(index, 10),
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
    const attachments = this.getSelectedItems();
    const optionContainer = this.eGui.querySelector(
      '.grid-cell-option-container',
    ) as HTMLDivElement;
    while (optionContainer.firstChild) {
      optionContainer.removeChild(optionContainer.firstChild);
    }
    attachments.forEach((attachment: any, index: number) => {
      const option = this.createAttachment(attachment, index);
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

  private createAttachment(attachment: IAdaptedAttachment, index: number) {
    const attachmentContainer = document.createElement('div');
    attachmentContainer.setAttribute('class', 'grid-cell-attachment-option');
    attachmentContainer.setAttribute('data-index', `${index}`);
    attachmentContainer.addEventListener('click', this.handleClickOption);
    const img = document.createElement('img');
    img.setAttribute('class', 'gird-cell-attachment-img');
    img.setAttribute('draggable', 'false');
    img.setAttribute('alt', '');
    img.setAttribute('src', attachment.url);
    attachmentContainer.appendChild(img);
    return attachmentContainer;
  }

  private getSelectedItems = () => {
    const { value } = this.params!;
    return (value && value.content) || [];
  };
}

export default GridCellAttachmentRenderer;
