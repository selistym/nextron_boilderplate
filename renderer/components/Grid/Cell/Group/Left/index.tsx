import { ICellRendererParams } from 'ag-grid-community';
import React from 'react';

import { GRID_INDEX_WIDTH } from '@app/renderer/constants/cores';
import { StackModalType } from '@app/renderer/constants/modals';

import ButtonIcon from '@app/renderer/components/Button/Icon';
import { glyphs } from '@app/renderer/components/Icon';

import GroupCellLeftFooter from './Footer';
import GroupCellLeftHeader from './Header';

const OUTER_DIV_SETTINGS: any = {
  // numOfRowGroups
  0: {
    backgroundColor: 'inherit',
    gapStyles: [],
  },
  1: {
    backgroundColor: '#E8E9E8',
    gapStyles: [{ backgroundColor: '#E8E9E8' }],
  },
  2: {
    backgroundColor: '#E2E2E2',
    gapStyles: [
      { backgroundColor: '#E2E2E2' },
      { backgroundColor: '#E8E9E8', borderLeft: '1px solid #B0B0BB' },
    ],
  },
  3: {
    backgroundColor: '#D6D6D6',
    gapStyles: [
      { backgroundColor: '#D6D6D6' },
      { backgroundColor: '#E2E2E2', borderLeft: '1px solid #B0B0BB' },
      { backgroundColor: '#E8E9E8', borderLeft: '1px solid #B0B0BB' },
    ],
  },
};

/**
 * This component is just the left side cells for each group.
 */
class GroupCellLeftRenderer extends React.Component<ICellRendererParams> {
  constructor(props: ICellRendererParams) {
    super(props);
  }

  public render() {
    const { value, node, columnApi, colDef } = this.props;
    const { addStackModal, coreId, tableId } = colDef.cellRendererParams;
    const rowId = this.props.data.id;
    const numOfRowGroups = columnApi.getRowGroupColumns().length;

    if (node.footer) return <GroupCellLeftFooter numOfRowGroups={numOfRowGroups} {...this.props} />;
    if (node.group) return <GroupCellLeftHeader numOfRowGroups={numOfRowGroups} {...this.props} />;

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
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            borderLeft: '1px solid #B0B0BB',
            borderBottom: '1px solid #ebeae9',
            paddingLeft: '10px',
            // backgroundColor: 'inherit',
          }}
        >
          <div
            className="row-index-value"
            style={{ marginLeft: '5px', marginRight: '5px', width: '30px' }}
          >
            {value}
          </div>
          <div className="row-index-expand">
            <ButtonIcon
              onClick={() =>
                addStackModal({ type: StackModalType.Record, props: { coreId, tableId, rowId } })
              }
              iconProps={{ icon: glyphs.EXPAND_RECORD, size: { height: 15, width: 15 } }}
            />
          </div>
          {/* Derek  : I'm really not sure why this is here and I forgot... Lets delete it after I do testing for grouping. */}
          {/* <span style={{ width: '100%' }} className="first-col">
            {value}
          </span> */}
        </div>
      </div>
    );
  }
}

export default GroupCellLeftRenderer;
