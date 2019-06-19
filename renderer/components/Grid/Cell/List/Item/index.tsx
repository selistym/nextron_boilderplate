import { get } from 'lodash';

import AttachmentList from '@app/renderer/components/FieldTypes/Attachment/List';
import DateTimeItem from '@app/renderer/components/FieldTypes/DateTime/Item';
import NumberItem from '@app/renderer/components/FieldTypes/Number/Item';
import ReferenceList from '@app/renderer/components/FieldTypes/Reference/List';
import SelectList from '@app/renderer/components/FieldTypes/Select/List';
import TextItem from '@app/renderer/components/FieldTypes/Text/Item';

import { ICellContent } from '@app/renderer/modules/core/types';
interface IProps {
  cell: ICellContent;
  columnsById: any;
}

const ListItem: React.FC<IProps> = ({ cell, columnsById }) => {
  switch (cell.type) {
    case 'TEXT':
      return <TextItem value={cell.content} />;
    case 'DATETIME':
      return (
        <DateTimeItem
          value={cell.content}
          dateFormat={get(columnsById, `${cell.columnId}.typeOptions.dateFormat`)}
          timeFormat={get(columnsById, `${cell.columnId}.typeOptions.timeFormat`)}
        />
      );
    case 'MULTI_SELECT':
      return <SelectList items={cell.content} css={{ height: '33px' }} />;
    case 'RECORD_REFERENCE':
      return <ReferenceList items={cell.content} css={{ height: '33px' }} />;
    case 'NUMBER':
      return (
        <NumberItem
          value={cell.content}
          precision={get(columnsById, `${cell.columnId}.typeOptions.precision`)}
        />
      );
    case 'MULTI_ATTACHMENT':
      return <AttachmentList items={cell.content} css={{ height: '46px' }} />;
    default:
      return null;
  }
};

export default ListItem;
