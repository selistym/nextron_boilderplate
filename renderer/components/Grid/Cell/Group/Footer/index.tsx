import { ICellRendererParams } from 'ag-grid-community';
import React from 'react';

import { LAST_COL_FLAG } from '@app/renderer/constants/grid';

/**
 * 1. Footer-custom class is only given to the footers that act as buttons
 * 2. All other footers are used as the actually spacing for containers
 */
class GroupCellFooter extends React.Component<ICellRendererParams> {
  constructor(props: ICellRendererParams) {
    super(props);
  }

  public render() {
    const { node, columnApi, colDef } = this.props;
    const numOfRowGroups = columnApi.getRowGroupColumns().length;
    const layer = numOfRowGroups - node.level;
    return (
      <div
        style={{
          backgroundColor: layer === 2 ? '#E8E9E8' : '#E2E2E2',
          borderBottom:
            (node.level + 1 < numOfRowGroups || !colDef[LAST_COL_FLAG]) && '1px solid #B0B0BB',
          display: 'flex',
          alignItems: 'flex-start',
          height: '100%',
          width: '100%',
        }}
      >
        {node.level === numOfRowGroups - 1 && (
          <div
            className="footer-custom"
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              height: '50px',
              paddingLeft: '10px',
              borderBottom: '1px solid #B0B0BB',
            }}
          />
        )}
      </div>
    );
  }
}

export default GroupCellFooter;
