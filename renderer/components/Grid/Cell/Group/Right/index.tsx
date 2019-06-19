import { ICellRendererParams } from 'ag-grid-community';
import React from 'react';

import GroupCellLeftFooter from './Footer';
import GroupCellLeftHeader from './Header';

const BORDER_STYLE = '1px solid #B0B0BB';
const OUTER_DIV_SETTINGS: any = {
  // numOfRowGroups
  0: {
    backgroundColor: 'transparent',
    gapStyles: [],
  },
  1: {
    backgroundColor: '#E8E9E8',
    gapStyles: [{ backgroundColor: '#E8E9E8' }],
  },
  2: {
    backgroundColor: '#E2E2E2',
    gapStyles: [
      { backgroundColor: '#E8E9E8', borderRight: BORDER_STYLE },
      { backgroundColor: '#E2E2E2' },
    ],
  },
  3: {
    backgroundColor: '#D6D6D6',
    gapStyles: [
      { backgroundColor: '#E8E9E8', borderRight: BORDER_STYLE },
      { backgroundColor: '#E2E2E2', borderRight: BORDER_STYLE },
      { backgroundColor: '#D6D6D6' },
    ],
  },
};

/**
 * This component is just the right side cells for each group.
 */
class GroupCellRightRenderer extends React.Component<ICellRendererParams> {
  constructor(props: ICellRendererParams) {
    super(props);
  }

  public render() {
    const { node, columnApi } = this.props;
    const numOfRowGroups = columnApi.getRowGroupColumns().length;

    if (node.footer) return <GroupCellLeftFooter {...this.props} numOfRowGroups={numOfRowGroups} />;
    if (node.group) return <GroupCellLeftHeader {...this.props} />;

    return (
      <div
        style={{
          backgroundColor: OUTER_DIV_SETTINGS[numOfRowGroups].backgroundColor,
          display: 'flex',
          width: '100%',
          height: '100%',
        }}
      >
        {OUTER_DIV_SETTINGS[numOfRowGroups].gapStyles.map(
          (style: { [key: string]: string }, index: number) => (
            <div
              key={index}
              style={{
                flex: '0 0 15px',
                height: '100%',
                ...style,
              }}
            />
          ),
        )}
      </div>
    );
  }
}

export default GroupCellRightRenderer;
