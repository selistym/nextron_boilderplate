import { ICellEditorParams } from 'ag-grid-community';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import React, { createRef } from 'react';

import { KEY_CODES } from '@app/renderer/constants/app';

import { Textarea } from './styled';

@observer
class GridCellMultilineTextEditor extends React.Component<ICellEditorParams> {
  private inputRef: React.RefObject<HTMLTextAreaElement>;

  @observable private value: string;

  constructor(props: ICellEditorParams) {
    super(props);
    this.inputRef = createRef();

    this.value = props.value;
    if (props.keyPress === KEY_CODES.BACKSPACE || props.keyPress === KEY_CODES.DELETE) {
      this.value = '';
    }
  }

  public componentWillUnmount() {
    if (this.inputRef.current) {
      this.inputRef.current.removeEventListener('keydown', this.handleEnterEvent);
    }
  }

  public afterGuiAttached() {
    if (this.inputRef.current) {
      this.inputRef.current.addEventListener('keydown', this.handleEnterEvent);
      this.inputRef.current.focus();
    }
  }

  public getValue() {
    return this.value;
  }

  public isPopup() {
    return true;
  }

  public render() {
    const { eGridCell } = this.props;
    const { left, top, width } = eGridCell.getBoundingClientRect();
    return (
      <Textarea
        left={left}
        top={top}
        width={width}
        value={this.value}
        onChange={this.handleChange}
        ref={this.inputRef}
      />
    );
  }

  private handleEnterEvent = (e: KeyboardEvent) => {
    const key = e.which || e.keyCode;
    if (
      key === KEY_CODES.ARROW_LEFT ||
      key === KEY_CODES.ARROW_RIGHT ||
      key === KEY_CODES.ARROW_UP ||
      key === KEY_CODES.ARROW_DOWN ||
      key === KEY_CODES.ENTER
    ) {
      e.stopPropagation();
    }
  };

  @action
  private handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.value = e.target.value;
  };
}

export default GridCellMultilineTextEditor;
