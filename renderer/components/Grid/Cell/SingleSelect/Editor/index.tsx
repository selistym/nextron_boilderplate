import { ICellEditorParams } from 'ag-grid-community';
import React from 'react';

import ModalSelect from '@app/renderer/components/Modal/Select';
import Option, { IOption } from '@app/renderer/components/Option';

import { formatCell } from '@app/renderer/modules/core/helper';
import { isStartWithDeleteKey } from '@app/renderer/utils/keyboard';

interface IState {
  value: any;
}

class GridCellSelectEditor extends React.Component<ICellEditorParams, IState> {
  constructor(props: ICellEditorParams) {
    super(props);

    const { keyPress } = props;

    this.state = {
      value: isStartWithDeleteKey(keyPress) ? undefined : props.value && props.value.content,
    };
  }

  public afterGuiAttached() {
    const { stopEditing, keyPress } = this.props;

    if (isStartWithDeleteKey(keyPress)) {
      stopEditing(false);
    }
  }

  public getValue() {
    return formatCell(this.state.value);
  }

  public isPopup() {
    return true;
  }

  public render() {
    const { eGridCell, colDef } = this.props;
    const { width } = eGridCell.getBoundingClientRect();
    const { choices } = colDef.typeOptions;

    /** we remove empty option currently and add in the future */
    // const options = [{ id: '', name: '', color: '' }, ...choices];

    const selectedIndex = this.state.value
      ? choices.findIndex((choice: IOption) => choice.id === this.state.value.id)
      : -1;
    return (
      <ModalSelect
        parentSize={eGridCell.getBoundingClientRect()}
        width={width}
        defaultIndex={selectedIndex === -1 ? 0 : selectedIndex}
        renderOption={(option: any) => <Option option={option} />}
        onClickOption={this.handleOptionClick}
        onClose={this.handleClose}
        options={choices}
      />
    );
  }

  private handleOptionClick = (option: IOption) => {
    this.setState({ value: option.id ? option : undefined }, () => this.props.stopEditing(true));
  };

  private handleClose = () => {
    this.props.stopEditing(true);
  };
}

export default GridCellSelectEditor;
