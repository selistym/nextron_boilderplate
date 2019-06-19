import { ICellRendererParams } from 'ag-grid-community';
import React from 'react';

interface IProps extends ICellRendererParams {
  numOfRowGroups: number;
}

const BORDER_STYLE = '1px solid #B0B0BB';
// Inner content basically the part that encompasses the row group name
const INNER_CONTENT_STYLE = {
  backgroundColor: '#F5F5F5',
  borderTop: BORDER_STYLE,
  borderLeft: BORDER_STYLE,
  borderBottom: BORDER_STYLE,
  borderTopLeftRadius: '5px',
};
// This is basically where it creates the upside down L shape border
const TOP_LEFT_BORDER_STYLE = {
  height: '50px',
  borderLeft: BORDER_STYLE,
  borderTopLeftRadius: '5px',
  borderTop: BORDER_STYLE,
};
// This is where there is a border on the left, that is straight
const LEFT_BORDER_STYLE = {
  height: '100%',
  borderLeft: BORDER_STYLE,
};

const INNER_LAYER_0_COLOR = '#E8E9E8';
const INNER_LAYER_1_COLOR = '#E2E2E2';
const INNER_LAYER_2_COLOR = '#D6D6D6';

const OUTER_DIV_SETTINGS: any = {
  // numOfRowGroups
  1: {
    // level
    0: {
      backgroundColor: INNER_LAYER_0_COLOR,
      gapStyles: [{ height: '100%', backgroundColor: INNER_LAYER_0_COLOR }],
      contentStyle: INNER_CONTENT_STYLE,
    },
  },
  2: {
    0: {
      backgroundColor: INNER_LAYER_1_COLOR,
      gapStyles: [
        { height: '100%', backgroundColor: INNER_LAYER_1_COLOR },
        { ...TOP_LEFT_BORDER_STYLE, backgroundColor: INNER_LAYER_0_COLOR },
      ],
      contentStyle: {
        backgroundColor: INNER_LAYER_0_COLOR,
        borderTop: BORDER_STYLE,
      },
    },
    1: {
      backgroundColor: INNER_LAYER_0_COLOR,
      gapStyles: [
        { height: '100%', backgroundColor: INNER_LAYER_1_COLOR },
        { ...LEFT_BORDER_STYLE, backgroundColor: INNER_LAYER_0_COLOR },
      ],
      contentStyle: INNER_CONTENT_STYLE,
    },
  },
  3: {
    0: {
      backgroundColor: INNER_LAYER_2_COLOR,
      gapStyles: [
        { height: '100%', backgroundColor: INNER_LAYER_2_COLOR },
        { ...TOP_LEFT_BORDER_STYLE, backgroundColor: INNER_LAYER_1_COLOR },
      ],
      contentStyle: {
        backgroundColor: INNER_LAYER_1_COLOR,
        borderTop: BORDER_STYLE,
      },
    },
    1: {
      backgroundColor: INNER_LAYER_1_COLOR,
      gapStyles: [
        { height: '100%', backgroundColor: INNER_LAYER_2_COLOR },
        { ...LEFT_BORDER_STYLE, backgroundColor: INNER_LAYER_1_COLOR },
        { ...TOP_LEFT_BORDER_STYLE, backgroundColor: INNER_LAYER_0_COLOR },
      ],
      contentStyle: {
        backgroundColor: INNER_LAYER_0_COLOR,
        borderTop: BORDER_STYLE,
      },
    },
    2: {
      backgroundColor: INNER_LAYER_0_COLOR,
      gapStyles: [
        { height: '100%', backgroundColor: INNER_LAYER_2_COLOR },
        { ...LEFT_BORDER_STYLE, backgroundColor: INNER_LAYER_1_COLOR },
        { ...LEFT_BORDER_STYLE, backgroundColor: INNER_LAYER_0_COLOR },
      ],
      contentStyle: INNER_CONTENT_STYLE,
    },
  },
};

/**
 * This component is the header for each row group, left side.
 */
const GroupCellLeftHeader: React.FC<IProps> = ({ node, numOfRowGroups }) => (
  <div
    style={{
      backgroundColor: OUTER_DIV_SETTINGS[numOfRowGroups][node.level].backgroundColor,
      display: 'flex',
      alignItems: 'flex-end',
      height: '100%',
      width: '100%',
    }}
  >
    {OUTER_DIV_SETTINGS[numOfRowGroups][node.level].gapStyles.map((style: any, index: number) => (
      <div
        key={index}
        style={{
          ...style,
          flex: '0 0 15px',
          ...getExpandedGapStyles(
            !!(node.expanded && node.group),
            numOfRowGroups - node.level - 1,
            numOfRowGroups - index - 1,
            index,
          ),
        }}
      />
    ))}
    <div
      style={{
        ...OUTER_DIV_SETTINGS[numOfRowGroups][node.level].contentStyle,
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        height: '50px',
        paddingLeft: '10px',
        ...getExpandedContentStyles(
          !!(node.expanded && node.group),
          numOfRowGroups - node.level - 1,
        ),
      }}
    />
  </div>
);

/**
 * We just need to check if content is the most inner layer or not.
 * @param isExpanded
 * @param layer
 */
const getExpandedContentStyles = (isExpanded: boolean, layer: number) => {
  if (isExpanded) return {};

  return layer === 0 ? { borderBottomLeftRadius: '5px' } : { borderBottom: BORDER_STYLE };
};

/**
 * Looks confusing. First we need to get the index numbers from inside out. So the most inner
 * component is layer 0. Same with gapLayer, it goes from inside out, instead of outside in.
 * Since it is layer and gapLayer is offset by 1, we need to + 1.
 * We then use gapIdx to make sure the very outside gap never has a border on the bottom.
 * @param isExpanded
 * @param layer
 * @param gapLayer
 * @param gapIdx
 */
const getExpandedGapStyles = (
  isExpanded: boolean,
  layer: number,
  gapLayer: number,
  gapIdx: number,
) => {
  if (!isExpanded && gapIdx !== 0 && gapLayer + 1 === layer) {
    return { borderBottomLeftRadius: '5px', borderBottom: BORDER_STYLE };
  }

  return {};
};

export default GroupCellLeftHeader;
