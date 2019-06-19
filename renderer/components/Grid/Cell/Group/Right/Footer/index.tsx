import { ICellRendererParams } from 'ag-grid-community';
import React from 'react';

interface IProps extends ICellRendererParams {
  numOfRowGroups: number;
}

const OUTER_DIV_SETTINGS: any = {
  // numOfRowGroups
  0: {
    // level
    0: {
      backgroundColor: '#E8E9E8',
      gapStyles: [],
    },
  },
  1: {
    0: {
      backgroundColor: '#E8E9E8',
      gapStyles: [],
    },
  },
  2: {
    0: {
      backgroundColor: '#E2E2E2',
      gapStyles: [
        {
          borderRight: '1px solid #B0B0BB',
          backgroundColor: '#E8E9E8',
          borderBottomRightRadius: '5px',
          borderBottom: '1px solid #B0B0BB',
        },
      ],
    },
    1: {
      backgroundColor: '#E2E2E2',
      gapStyles: [
        {
          borderRight: '1px solid #B0B0BB',
          backgroundColor: '#E8E9E8',
        },
      ],
    },
  },
  3: {
    0: {
      backgroundColor: '#D6D6D6',
      gapStyles: [
        {
          borderBottom: '1px solid #B0B0BB',
          backgroundColor: '#E2E2E2',
        },
        {
          borderRight: '1px solid #B0B0BB',
          backgroundColor: '#E2E2E2',
          borderBottomRightRadius: '5px',
          borderBottom: '1px solid #B0B0BB',
        },
      ],
    },
    1: {
      backgroundColor: '#D6D6D6',
      gapStyles: [
        {
          borderRight: '1px solid #B0B0BB',
          backgroundColor: '#E8E9E8',
          borderBottomRightRadius: '5px',
          borderBottom: '1px solid #B0B0BB',
        },
        {
          borderRight: '1px solid #B0B0BB',
          backgroundColor: '#E2E2E2',
        },
      ],
    },
    2: {
      backgroundColor: '#D6D6D6',
      gapStyles: [
        {
          borderRight: '1px solid #B0B0BB',
          backgroundColor: '#E8E9E8',
        },
        {
          borderRight: '1px solid #B0B0BB',
          backgroundColor: '#E2E2E2',
        },
      ],
    },
  },
};

/**
 * This component is the right side footer "add button row".
 */
class GroupCellRightFooter extends React.Component<IProps> {
  public render() {
    const { node, numOfRowGroups } = this.props;

    return (
      <div
        style={{
          backgroundColor: OUTER_DIV_SETTINGS[numOfRowGroups][node.level].backgroundColor,
          display: 'flex',
          alignItems: 'flex-start',
          height: '100%',
          width: '100%',
        }}
      >
        {OUTER_DIV_SETTINGS[numOfRowGroups][node.level].gapStyles.map(
          (style: { [key: string]: string }, index: number) => (
            <div
              key={index}
              style={{
                ...style,
                flex: '0 0 15px',
                height: '100%',
              }}
            />
          ),
        )}
      </div>
    );
  }
}

export default GroupCellRightFooter;
