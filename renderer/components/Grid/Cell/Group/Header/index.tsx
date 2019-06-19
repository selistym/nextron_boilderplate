import Icon, { glyphs } from '@app/renderer/components/Icon';
import { ICellRendererParams } from 'ag-grid-community';
import React from 'react';

import { FIRST_COL_FLAG, LAST_COL_FLAG } from '@app/renderer/constants/grid';

import { Span } from './styled';

// This is basically only for the inner layer. Which is always the same color.
const INNER_CONTENT_0_STYLE = {
  backgroundColor: '#F5F5F5',
  borderTop: '1px solid #B0B0BB',
};

// This is always for the 2nd inner layer.
const INNER_CONTENT_1_STYLE = {
  backgroundColor: '#E8E9E8',
  borderTop: '1px solid #B0B0BB',
};

const INNER_CONTENT_2_STYLE = {
  backgroundColor: '#E2E2E2',
  borderTop: '1px solid #B0B0BB',
};
const DIV_SETTINGS: any = {
  // numOfRowGroups
  1: {
    // levels
    0: {
      backgroundColor: '#E8E9E8',
      style: INNER_CONTENT_0_STYLE,
    },
  },
  2: {
    0: {
      backgroundColor: '#E2E2E2',
      style: INNER_CONTENT_1_STYLE,
    },
    1: {
      backgroundColor: '#E8E9E8',
      style: INNER_CONTENT_0_STYLE,
    },
  },
  3: {
    0: {
      backgroundColor: '#D6D6D6',
      style: INNER_CONTENT_2_STYLE,
    },
    1: {
      backgroundColor: '#E2E2E2',
      style: INNER_CONTENT_1_STYLE,
    },
    2: {
      backgroundColor: '#E8E9E8',
      style: INNER_CONTENT_0_STYLE,
    },
  },
};

/**
 * This component is the Header component when there is a group. It is imported in each of the renderer files for each
 * field type.
 */
class GroupCellHeader extends React.Component<ICellRendererParams> {
  constructor(props: ICellRendererParams) {
    super(props);
  }

  public render() {
    const { node, colDef, value, api, rowIndex, columnApi } = this.props;
    const numOfRowGroups = columnApi.getRowGroupColumns().length;
    const rightBorder =
      node.level + 1 === numOfRowGroups && colDef[LAST_COL_FLAG]
        ? { borderTopRightRadius: '5px', borderRight: '1px solid #B0B0BB' }
        : {};

    return (
      <div
        style={{
          backgroundColor: DIV_SETTINGS[numOfRowGroups][node.level].backgroundColor,
          display: 'flex',
          alignItems: 'flex-end',
          height: '100%',
          width: '100%',
        }}
      >
        <div
          className="group-header-custom"
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            height: '50px',
            paddingLeft: '10px',
            ...DIV_SETTINGS[numOfRowGroups][node.level].style,
            ...rightBorder,
            ...getExpandedStyles(node.expanded, numOfRowGroups - node.level - 1),
          }}
        >
          {colDef[FIRST_COL_FLAG] && (
            <button
              onClick={() => {
                node.expanded = !node.expanded;
                api.onGroupExpandedOrCollapsed(rowIndex);
              }}
              style={
                {
                  alignItems: 'center',
                  display: 'flex',
                  position: 'absolute',
                  left: `-${35 + (numOfRowGroups - node.level - 1) * 15}px`,
                  cursor: 'pointer',
                } // Maths...!
              }
            >
              <Icon size={{ width: 10, height: 10 }} icon={glyphs.ARROW_DROPDOWN} />
              <Span>{value}</Span>
            </button>
          )}
        </div>
      </div>
    );
  }
}

/**
 * When a row group is contracted, it must have the border in the bottom. Unless you are
 * the inner most layer!
 * @param isExpanded
 * @param layer
 */
const getExpandedStyles = (isExpanded: boolean, layer: number) => {
  return !isExpanded || layer === 0 ? { borderBottom: '1px solid #B0B0BB' } : {};
};

export default GroupCellHeader;
