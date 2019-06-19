import { ICellEditorParams } from 'ag-grid-community';
import React, { createRef } from 'react';

import { isNumberAllowKeyPress, isStartWithDeleteKey } from '@app/renderer/utils/keyboard';

import { formatCell } from '@app/renderer/modules/core/helper';

import { Input } from './styled';

interface IState {
  value: any;
}

class GridCellNumberEditor extends React.Component<ICellEditorParams, IState> {
  private shouldCancelBeforeStart: boolean;
  private inputRef: React.RefObject<HTMLInputElement>;

  constructor(props: ICellEditorParams) {
    super(props);

    const { charPress } = props;
    this.inputRef = createRef();
    this.shouldCancelBeforeStart = this.isInValidChar(charPress);
    this.state = this.getState(props);
  }

  public isCancelBeforeStart() {
    return this.shouldCancelBeforeStart;
  }

  public afterGuiAttached() {
    const { stopEditing, keyPress } = this.props;

    if (isStartWithDeleteKey(keyPress)) stopEditing(false);
    if (this.inputRef.current) this.inputRef.current.focus();
  }

  public getValue() {
    return formatCell(this.state.value && (Number(this.state.value) || this.props.value));
  }

  public render() {
    return (
      <Input
        onKeyDown={this.handleKeyDown}
        autoComplete="off"
        value={this.state.value}
        onChange={this.handleChange}
        ref={this.inputRef}
      />
    );
  }

  private handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (this.isInValidChar(event.key)) {
      event.preventDefault();
    }
  };

  private isInValidChar = (key: string | null) => {
    return !!key && !isNumberAllowKeyPress[key] && '1234567890.-'.indexOf(key) < 0;
  };

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value });
  };

  private getState = (params: ICellEditorParams) => {
    const { charPress, keyPress, value, colDef } = params;
    const precision = colDef.typeOptions ? colDef.typeOptions.precision : 1;

    if (isStartWithDeleteKey(keyPress)) return { value: '' };
    if (charPress) return { value: charPress };

    return {
      value:
        value && (value.content || value.content === 0) ? value.content.toFixed(precision) : '',
    };
  };
}

export default GridCellNumberEditor;
