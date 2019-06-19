import { ICellRendererParams } from 'ag-grid-community';
import React from 'react';

import { GroupCellFooter, GroupCellHeader } from '../../Group';

import { Span } from '../../shared';

class GridCellMultilineTextRenderer extends React.Component<ICellRendererParams> {
  constructor(props: ICellRendererParams) {
    super(props);
  }

  public render() {
    const { value, node } = this.props;
    if (node.footer) return <GroupCellFooter {...this.props} />;
    if (node.group) return <GroupCellHeader {...this.props} />;

    return <Span>{value}</Span>;
  }
}

export default GridCellMultilineTextRenderer;
