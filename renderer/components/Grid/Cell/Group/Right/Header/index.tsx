import { ICellRendererParams } from 'ag-grid-community';
import React from 'react';

const BORDER_STYLE = '1px solid #B0B0BB';
const OUTER_DIV_SETTINGS: any = {
  // numOfRowGroups
  1: {
    // group level
    0: {
      backgroundColor: '#E8E9E8',
      gapStyles: [
        {
          height: '100%',
          borderLeft: '1px solid #EBEAE9',
          backgroundColor: '#E8E9E8',
        },
      ],
      contentStyle: {
        backgroundColor: '#F5F5F5',
        borderTop: BORDER_STYLE,
        borderLeft: BORDER_STYLE,
        borderBottom: BORDER_STYLE,
        borderTopLeftRadius: '5px',
      },
    },
  },
  2: {
    0: {
      backgroundColor: '#E2E2E2',
      gapStyles: [
        {
          height: '50px',
          borderRight: BORDER_STYLE,
          borderTopRightRadius: '5px',
          borderTop: BORDER_STYLE,
          backgroundColor: '#E8E9E8',
        },
        {
          height: '100%',
          backgroundColor: '#E2E2E2',
        },
      ],
      contentStyle: {
        backgroundColor: '#E8E9E8',
        borderTop: BORDER_STYLE,
      },
    },
    1: {
      backgroundColor: '#E2E2E2',
      gapStyles: [
        {
          height: '100%',
          borderRight: BORDER_STYLE,
          backgroundColor: '#E8E9E8',
        },
        {
          height: '100%',
          backgroundColor: '#E2E2E2',
        },
      ],
      contentStyle: {
        backgroundColor: '#F5F5F5',
        borderTop: BORDER_STYLE,
        borderRight: BORDER_STYLE,
        borderBottom: BORDER_STYLE,
        borderTopRightRadius: '5px',
      },
    },
  },
  3: {
    0: {
      backgroundColor: '#D6D6D6',
      gapStyles: [
        {
          height: '50px',
          backgroundColor: '#E2E2E2',
          borderTop: BORDER_STYLE,
        },
        {
          height: '50px',
          borderRight: BORDER_STYLE,
          borderTopRightRadius: '5px',
          borderTop: BORDER_STYLE,
          backgroundColor: '#E2E2E2',
        },
        {
          height: '100%',
          backgroundColor: '#D6D6D6',
        },
      ],
    },
    1: {
      backgroundColor: '#D6D6D6',
      gapStyles: [
        {
          height: '50px',
          borderRight: BORDER_STYLE,
          borderTopRightRadius: '5px',
          borderTop: BORDER_STYLE,
          backgroundColor: '#E8E9E8',
        },
        {
          height: '100%',
          borderRight: BORDER_STYLE,
          backgroundColor: '#E2E2E2',
        },
        {
          height: '100%',
          backgroundColor: '#D6D6D6',
        },
      ],
    },
    2: {
      backgroundColor: '#D6D6D6',
      gapStyles: [
        {
          height: '100%',
          borderRight: BORDER_STYLE,
          backgroundColor: '#E8E9E8',
        },
        {
          height: '100%',
          borderRight: BORDER_STYLE,
          backgroundColor: '#E2E2E2',
        },
        {
          height: '100%',
          backgroundColor: '#D6D6D6',
        },
      ],
    },
  },
};

/**
 * This component is the header for each row group, right side.
 */
class GroupCellRightHeader extends React.Component<ICellRendererParams> {
  constructor(props: ICellRendererParams) {
    super(props);
  }

  public render() {
    const { node, columnApi } = this.props;
    const numOfRowGroups = columnApi.getRowGroupColumns().length;

    return (
      <div
        style={{
          backgroundColor: OUTER_DIV_SETTINGS[numOfRowGroups][node.level].backgroundColor,
          display: 'flex',
          alignItems: 'flex-end',
          height: '100%',
          width: '100%',
        }}
      >
        {OUTER_DIV_SETTINGS[numOfRowGroups][node.level].gapStyles.map(
          (style: { [key: string]: string }, index: number) => {
            return (
              <div
                key={index}
                style={{
                  flex: '0 0 15px',
                  height: '100%',
                  ...style,
                  ...getExpandedGapStyles(
                    !!(node.expanded && node.group),
                    numOfRowGroups - node.level - 1,
                    index,
                  ),
                }}
              />
            );
          },
        )}
      </div>
    );
  }
}

/**
 * Looks confusing. First we need to make sure we get the layers from inside out. Inner layer is layer = 0.
 * Then every matching gapIdx with layer (with offset) will have a rounded border.
 * But also, every one behind it will also have a bottom border.
 * @param isExpanded
 * @param layer
 * @param gapIdx
 */
const getExpandedGapStyles = (isExpanded: boolean, layer: number, gapIdx: number) => {
  if (!isExpanded && gapIdx === layer - 1) {
    return { borderBottomRightRadius: '5px', borderBottom: BORDER_STYLE };
  }

  if (!isExpanded && gapIdx < layer - 1) {
    return { borderBottom: BORDER_STYLE };
  }

  return {};
};

export default GroupCellRightHeader;
