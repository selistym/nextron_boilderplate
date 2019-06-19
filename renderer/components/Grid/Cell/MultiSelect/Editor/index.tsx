import { ICellEditorParams } from 'ag-grid-community';
import React from 'react';

import ModalSelect from '@app/renderer/components/Modal/Select';
import Option, { IOption } from '@app/renderer/components/Option';

import { formatCell } from '@app/renderer/modules/core/helper';
import { isStartWithDeleteKey } from '@app/renderer/utils/keyboard';

interface IState {
  value: IOption[];
}

class GridCellMultiSelectEditor extends React.Component<ICellEditorParams, IState> {
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
    const { choices } = colDef.typeOptions;
    const options = choices.filter(
      (choice: IOption) => this.state.value.findIndex((item) => item.id === choice.id) === -1,
    );

    return (
      <ModalSelect
        parentSize={this.props.eGridCell.getBoundingClientRect()}
        renderOption={(option: any) => <Option option={option} />}
        onClickOption={this.handleOptionClick}
        onClose={this.handleClose}
        options={options}
      />
    );
  }

  private handleOptionClick = (option: IOption) => {
    this.setState(
      (prevState) => ({
        value: prevState.value.concat([option]),
      }),
      () => this.props.stopEditing(true),
    );
  };

  private handleClose = () => {
    this.props.stopEditing(true);
  };
}

export default GridCellMultiSelectEditor;
