import { ICellEditorParams } from 'ag-grid-community';
import React from 'react';

import ButtonIcon from '@app/renderer/components/Button/Icon';
import { glyphs } from '@app/renderer/components/Icon';
import { openPicker } from '@app/renderer/lib/filestack';
import { formatCell } from '@app/renderer/modules/core/helper';

import { isStartWithDeleteKey } from '@app/renderer/utils/keyboard';

import {
  AddButtonMixin,
  Attachment,
  AttachmentContainer,
  Container,
  FocusContainer,
} from './styled';

interface IState {
  value: any[];
}
class GridCellAttachmentEditor extends React.Component<ICellEditorParams, IState> {
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
      return;
    }
    openPicker().then(this.updateCell);
  }

  public getValue() {
    return formatCell(this.state.value);
  }

  public render() {
    const attachments = this.state.value;

    return (
      <Container>
        <FocusContainer id="cell-focus-container">
          <ButtonIcon
            css={AddButtonMixin}
            onClick={() => void 0}
            iconProps={{ size: { height: 10, width: 10 }, icon: glyphs.PLUS }}
          />
        </FocusContainer>
        {attachments.map((attachment, index) => (
          <AttachmentContainer key={attachment.url} data-index={index} onClick={() => void 0}>
            <Attachment draggable={false} alt="" src={attachment.url} />
          </AttachmentContainer>
        ))}
      </Container>
    );
  }

  private updateCell = (file: any) => {
    if (file) {
      this.setState(
        (prevState) => ({
          value: prevState.value.concat([{ url: file.smallThumbUrl, name: file.fileName }]),
        }),
        () => this.props.stopEditing(true),
      );
    }
  };
}

export default GridCellAttachmentEditor;
