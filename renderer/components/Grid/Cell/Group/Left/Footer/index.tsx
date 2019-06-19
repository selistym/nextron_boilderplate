import Icon, { glyphs } from '@app/renderer/components/Icon';
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
      contentStyle: {
        paddingLeft: '10px',
        borderLeft: '1px solid #B0B0BB',
        borderBottom: '1px solid #B0B0BB',
        borderBottomLeftRadius: '5px',
      },
    },
  },
  1: {
    0: {
      backgroundColor: '#E8E9E8',
      gapStyles: [{ backgroundColor: '#E8E9E8' }],
      contentStyle: {
        paddingLeft: '10px',
        borderLeft: '1px solid #B0B0BB',
        borderBottom: '1px solid #B0B0BB',
        borderBottomLeftRadius: '5px',
      },
    },
  },
  2: {
    0: {
      backgroundColor: '#E8E9E8',
      gapStyles: [
        { backgroundColor: '#E2E2E2' },
        {
          borderLeft: '1px solid #B0B0BB',
          backgroundColor: '#E8E9E8',
        },
      ],
      contentStyle: {
        paddingLeft: '10px',
        borderLeft: '1px solid #B0B0BB',
        borderBottom: '1px solid #B0B0BB',
        borderBottomLeftRadius: '5px',
      },
    },
    1: {
      backgroundColor: '#E8E9E8',
      gapStyles: [
        { backgroundColor: '#E2E2E2' },
        {
          borderLeft: '1px solid #B0B0BB',
          backgroundColor: '#E8E9E8',
        },
      ],
      contentStyle: {
        paddingLeft: '10px',
        borderLeft: '1px solid #B0B0BB',
        borderBottom: '1px solid #B0B0BB',
        borderBottomLeftRadius: '5px',
      },
    },
  },
  3: {
    0: {
      backgroundColor: '#E2E2E2',
      gapStyles: [
        { backgroundColor: '#D6D6D6' },
        {
          borderLeft: '1px solid #B0B0BB',
          backgroundColor: '#E2E2E2',
        },
      ],
      contentStyle: {
        paddingLeft: '10px',
        borderLeft: '1px solid #B0B0BB',
        borderBottom: '1px solid #B0B0BB',
        borderBottomLeftRadius: '5px',
      },
    },
    1: {
      backgroundColor: '#E8E9E8',
      gapStyles: [
        { backgroundColor: '#D6D6D6' },
        {
          borderLeft: '1px solid #B0B0BB',
          backgroundColor: '#E2E2E2',
        },
        {
          borderLeft: '1px solid #B0B0BB',
          backgroundColor: '#E8E9E8',
        },
      ],
      contentStyle: {
        paddingLeft: '10px',
        borderLeft: '1px solid #B0B0BB',
        borderBottom: '1px solid #B0B0BB',
        borderBottomLeftRadius: '5px',
      },
    },
    2: {
      backgroundColor: '#D6D6D6',
      gapStyles: [
        { backgroundColor: '#D6D6D6' },
        {
          borderLeft: '1px solid #B0B0BB',
          backgroundColor: '#E2E2E2',
        },
        {
          borderLeft: '1px solid #B0B0BB',
          backgroundColor: '#E8E9E8',
        },
      ],
      contentStyle: {
        paddingLeft: '10px',
        borderLeft: '1px solid #B0B0BB',
        borderBottom: '1px solid #B0B0BB',
        borderBottomLeftRadius: '5px',
      },
    },
  },
};

/**
 * This component is the left side footer "add button row".
 */
class GroupCellLeftFooter extends React.Component<IProps> {
  public render() {
    const { node, numOfRowGroups } = this.props;

    return (
      <div
        style={{
          backgroundColor: OUTER_DIV_SETTINGS[numOfRowGroups][node.level].backgroundColor,
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-start',
          height: '100%',
          width: '100%',
        }}
      >
        {node.level < numOfRowGroups - 1 && (
          <div
            style={{
              position: 'absolute',
              height: '1px',
              borderBottom: '1px solid #B0B0BB',
              bottom: 0,
              right: 0,
              left: `${(numOfRowGroups - 1) * 15 + 5}px`,
            }}
          />
        )}
        {OUTER_DIV_SETTINGS[numOfRowGroups][node.level].gapStyles.map(
          (style: { [key: string]: string }, index: number) => {
            const bottomBorder =
              node.level + 1 === index
                ? {
                    borderBottomLeftRadius: '5px',
                    borderBottom: '1px solid #B0B0BB',
                  }
                : {};

            return (
              <div
                key={index}
                style={{
                  ...style,
                  ...bottomBorder,
                  flex: '0 0 15px',
                  height: '100%',
                }}
              />
            );
          },
        )}
        {node.level === numOfRowGroups - 1 && (
          <div
            className="footer-custom"
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              height: '50px',
              ...OUTER_DIV_SETTINGS[numOfRowGroups][node.level].contentStyle,
            }}
          >
            <Icon size={{ width: 15, height: 15 }} icon={glyphs.PLUS} />
          </div>
        )}
      </div>
    );
  }
}

export default GroupCellLeftFooter;
