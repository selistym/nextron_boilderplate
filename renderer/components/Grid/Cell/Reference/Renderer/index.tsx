import { ICellRendererParams } from 'ag-grid-community';

import { createAddButton, createExpandButton, createOption } from '../../shared';

import { StackModalType } from '@app/renderer/constants/modals';

class GridCellReferenceRenderer {
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
    this.eGui.appendChild(optionContainer);
    optionContainer.setAttribute('class', 'grid-cell-option-container');
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

  private handleOptionClick = (e: MouseEvent) => {
    if (this.params) {
      const { column } = this.params!;
      const { typeOptions } = column.getColDef();
      const foreignTableId = typeOptions.foreignTableId;
      const target = e.currentTarget as HTMLButtonElement;
      const optionId = target.dataset.optionid;
      if (optionId) {
        const pathnames = location.pathname.split('/');
        const url = pathnames
          .slice(0, pathnames.length - 2)
          .concat([foreignTableId])
          .join('/');
        window.open(url, '_blank');
      }
    }
  };

  private handleRemove = (e: MouseEvent) => {
    const { node, column } = this.params!;
    const selectedRows = this.getSelectedRows();
    const target = e.currentTarget as HTMLButtonElement;
    const optionId = target.dataset.optionid;
    if (optionId) {
      const newData = selectedRows.filter(({ foreignRowId }: any) => foreignRowId !== optionId);
      node.setDataValue(column, newData);
    }
  };

  private handleExpand = () => {
    const selectedRows = this.getSelectedRows();
    const { addStackModal, column, data } = this.params!;
    const { colId, headerName, typeOptions } = column.getColDef();
    addStackModal({
      type: StackModalType.Expand,
      props: {
        cell: {
          typeOptions,
          type: 'RECORD_REFERENCE',
          cellId: '',
          columnId: colId,
          columnName: headerName,
          value: selectedRows,
        },
        isLookup: typeOptions.type === 'LOOKUP',
        rowId: data.id,
      },
    });
  };

  private setAddButton = () => {
    const editable = this.params!.column.getColDef().editable;
    if (editable) {
      const focusContainer = document.createElement('div');
      focusContainer.setAttribute('class', 'grid-cell-focus-container');
      focusContainer.setAttribute('id', 'cell-focus-container');

      const button = createAddButton();
      button.addEventListener('click', this.handleAddButtonClick);

      focusContainer.appendChild(button);
      this.eGui.appendChild(focusContainer);
    }
  };

  private setOptions = () => {
    const selectedRows = this.getSelectedRows();
    const optionContainer = this.eGui.querySelector(
      '.grid-cell-option-container',
    ) as HTMLDivElement;
    while (optionContainer.firstChild) {
      optionContainer.removeChild(optionContainer.firstChild);
    }
    selectedRows.forEach((row: any) => {
      const option = createOption(
        {
          id: row.id,
          name: row.visibleName && row.visibleName[0] ? row.visibleName[0].value : 'Unnamed record',
          color: 'red',
        },
        undefined,
        this.handleOptionClick,
      );
      optionContainer.appendChild(option);
    });
  };

  private setExpandButton = () => {
    const expandButtonContainer = document.createElement('div');
    expandButtonContainer.setAttribute('class', 'grid-cell-expand-container');
    expandButtonContainer.setAttribute('id', 'cell-focus-container');

    const expandButton = createExpandButton();
    expandButton.addEventListener('click', this.handleExpand);
    expandButtonContainer.appendChild(expandButton);
    this.eGui.appendChild(expandButtonContainer);
  };

  private getSelectedRows = () => {
    const { value } = this.params!;
    return (value && value.content) || [];
  };
}

export default GridCellReferenceRenderer;
