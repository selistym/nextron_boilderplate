import { ICellEditorParams } from 'ag-grid-community';
import React from 'react';

import ModalRecordReference from '@app/renderer/components/Modal/RecordReference';
import { IRecordProps } from '@app/renderer/components/Record';

import { formatCell } from '@app/renderer/modules/core/helper';
import { isStartWithDeleteKey } from '@app/renderer/utils/keyboard';

interface IState {
  value: any[];
}

class GridCellReferenceEditor extends React.Component<ICellEditorParams, IState> {
  constructor(props: ICellEditorParams) {
    super(props);

    const { keyPress, value } = props;

    this.state = {
      value: (value && value.content) || [],
    };

    if (isStartWithDeleteKey(keyPress)) {
      this.setState({ value: [] });
    }
  }

  public afterGuiAttached() {
    const { stopEditing, keyPress } = this.props;

    if (isStartWithDeleteKey(keyPress)) {
      stopEditing(true);
    }
  }

  public isPopup() {
    return true;
  }

  public getValue() {
    return formatCell(this.state.value);
  }

  public render() {
    const { colDef } = this.props;
    const { foreignTableId } = colDef.typeOptions;
    const selectedRowIds = this.state.value.map((item) => item.id);
    return (
      <ModalRecordReference
        tableId={foreignTableId}
        selectedRowIds={selectedRowIds}
        onClickRecord={this.handleClickRecord}
        onClose={this.handleClose}
      />
    );
  }

  private handleClickRecord = (option: IRecordProps) => {
    this.setState(
      (prevState) => ({
        value: prevState.value.concat([
          { id: option.rowId, visibleName: [{ value: option.title }] },
        ]),
      }),
      () => this.props.stopEditing(true),
    );
  };

  private handleClose = () => {
    this.props.stopEditing(true);
  };
}

export default GridCellReferenceEditor;
