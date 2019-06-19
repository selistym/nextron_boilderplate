import { ICellEditorParams } from 'ag-grid-community';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import React, { createRef } from 'react';

import Icon, { glyphs } from '@app/renderer/components/Icon';

import { KEY_CODES } from '@app/renderer/constants/app';

import { Border, Container, IconStyle } from './styled';

@observer
class GridCellCheckboxEditor extends React.Component<ICellEditorParams> {
  private shouldCancelBeforeStart: boolean;
  private divRef: React.RefObject<HTMLDivElement>;

  @observable private value: boolean;

  constructor(props: ICellEditorParams) {
    super(props);
    this.divRef = createRef();

    const { keyPress, charPress, value } = props;
    this.shouldCancelBeforeStart = false;
    if (keyPress) {
      if (keyPress === KEY_CODES.BACKSPACE || keyPress === KEY_CODES.DELETE) {
        this.value = false;
      } else if (keyPress === KEY_CODES.ENTER) {
        this.value = !value;
      } else {
        this.value = value;
        this.shouldCancelBeforeStart = true;
      }
    } else if (charPress) {
      this.shouldCancelBeforeStart = true;
      this.value = !props.value;
    } else {
      this.value = !!props.value;
    }
  }

  public isCancelBeforeStart() {
    return this.shouldCancelBeforeStart;
  }

  public afterGuiAttached() {
    if (this.divRef.current) {
      // we should focus divRef to make `stopPropagation` work
      this.divRef.current.focus();
      this.divRef.current.addEventListener('keydown', this.handleKeyDown);
    }
  }

  public componentWillUnmount() {
    if (this.divRef.current) {
      this.divRef.current.removeEventListener('keydown', this.handleKeyDown);
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
    const { width, height } = eGridCell.getBoundingClientRect();
    return (
      <Container
        tabIndex={0}
        ref={this.divRef}
        onClick={this.updateValue}
        width={width}
        height={height}
      >
        <Border>
          {this.value && (
            <Icon css={IconStyle} size={{ height: 15, width: 15 }} icon={glyphs.CHECKBOX} />
          )}
        </Border>
      </Container>
    );
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    const key = e.which || e.keyCode;
    if (key === KEY_CODES.ENTER) {
      this.updateValue();
      e.stopPropagation();
    }
  };

  @action
  private updateValue = () => {
    this.value = !this.value;
  };
}

export default GridCellCheckboxEditor;
