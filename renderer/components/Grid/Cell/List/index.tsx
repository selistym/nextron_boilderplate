import { ICellRendererParams } from 'ag-grid-community';
import { get } from 'lodash';
import React from 'react';

import { GroupCellFooter, GroupCellHeader } from '../Group';

import AttachmentList from '@app/renderer/components/FieldTypes/Attachment/List';
import DateTimeItem from '@app/renderer/components/FieldTypes/DateTime/Item';
import NumberItem from '@app/renderer/components/FieldTypes/Number/Item';
import ReferenceList from '@app/renderer/components/FieldTypes/Reference/List';
import SelectList from '@app/renderer/components/FieldTypes/Select/List';
import TextItem from '@app/renderer/components/FieldTypes/Text/Item';
import ListItem from './Item';

import { ICellContent } from '@app/renderer/modules/core/types';

import { Container, LeftContent, LeftSide, RightContent, RightSide } from './styled';

class ListCellRenderer extends React.Component<ICellRendererParams> {
  constructor(props: ICellRendererParams) {
    super(props);
  }

  public render() {
    const { value, node } = this.props;
    if (node.footer) return <GroupCellFooter {...this.props} />;
    if (node.group) return <GroupCellHeader {...this.props} />;
    const { rows, columnsById } = value;
    const primaryColumnId = Object.keys(columnsById)[0];
    const primaryCell = rows.find((r) => r.columnId === primaryColumnId);

    return (
      <Container>
        <LeftSide>
          {primaryCell && (
            <LeftContent>
              <ListItem cell={primaryCell} columnsById={columnsById} />
            </LeftContent>
          )}
        </LeftSide>
        <RightSide>
          {rows.map((cell: ICellContent, index: string) => {
            if (cell.columnId === primaryColumnId) return null;
            return (
              <RightContent key={index}>
                <ListItem cell={cell} columnsById={columnsById} />
              </RightContent>
            );
          })}
        </RightSide>
      </Container>
    );
  }
}

export default ListCellRenderer;
