import { ICellEditorParams } from 'ag-grid-community';
import React, { createRef } from 'react';

import { KEY_CODES } from '@app/renderer/constants/app';

import { formatCell } from '@app/renderer/modules/core/helper';

import { Input } from './styled';

interface IState {
  value: string;
}

class GridCellTextEditor extends React.Component<ICellEditorParams, IState> {
  private inputRef: React.RefObject<HTMLInputElement>;

  constructor(props: ICellEditorParams) {
    super(props);
    this.inputRef = createRef();
    this.state = this.getState(props);
  }

  public afterGuiAttached() {
    if (this.inputRef.current) this.inputRef.current.focus();
  }

  public getValue() {
    return formatCell(this.state.value);
  }

  public render() {
    return (
      <Input defaultValue={this.state.value} onChange={this.handleChange} ref={this.inputRef} />
    );
  }

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
  };

  private getState = (props: ICellEditorParams) => {
    if (props.keyPress === KEY_CODES.BACKSPACE || props.keyPress === KEY_CODES.DELETE) {
      return { value: '' };
    }
    if (props.charPress) {
      return { value: props.charPress };
    }
    return { value: props.value && props.value.content };
  };
}

export default GridCellTextEditor;
