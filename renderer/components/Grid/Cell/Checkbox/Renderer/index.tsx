import { ICellRendererParams } from 'ag-grid-community';
import React from 'react';

import Icon, { glyphs } from '@app/renderer/components/Icon';

import { Container, IconStyle } from './styled';

class GridCellCheckboxRenderer extends React.Component<ICellRendererParams> {
  constructor(props: ICellRendererParams) {
    super(props);
  }

  public render() {
    const { value } = this.props;
    return (
      <Container>
        {value && <Icon css={IconStyle} size={{ height: 15, width: 15 }} icon={glyphs.CHECKBOX} />}
      </Container>
    );
  }
}

export default GridCellCheckboxRenderer;
