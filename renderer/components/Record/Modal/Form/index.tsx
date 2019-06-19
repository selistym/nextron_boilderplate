import React from 'react';

import { glyphs } from '@app/renderer/components/Icon';
import { FIELD_TYPES } from '@app/renderer/constants/fieldTypes';

import { ICellProps } from '../../index';
import { ColumnContainer, ColumnIcon, ColumnTitle, DropdownIcon, TopContainer } from './styled';

import ColumnTypeAttachment from './Attachment';
import ColumnTypeCheckbox from './Checkbox';
import ColumnTypeDate from './Date';
import ColumnTypeLookup from './Lookup';
import ColumnTypeMultilineText from './MultilineText';
import ColumnTypeNumber from './Number';
import ColumnTypeReference from './Reference';
import ColumnTypeMultiSelect from './Select/MultiSelect';
import ColumnTypeSingleSelect from './Select/SingleSelect';
import ColumnTypeText from './Text';

const TYPE_MAP: { [key: string]: any } = {
  TEXT: ColumnTypeText,
  NUMBER: ColumnTypeNumber,
  MULTILINE_TEXT: ColumnTypeMultilineText,
  SELECT: ColumnTypeSingleSelect,
  MULTI_SELECT: ColumnTypeMultiSelect,
  RECORD_REFERENCE: ColumnTypeReference,
  DATETIME: ColumnTypeDate,
  CHECKBOX: ColumnTypeCheckbox,
  DEFAULT: ColumnTypeText,
  LOOKUP: ColumnTypeLookup,
  MULTI_ATTACHMENT: ColumnTypeAttachment,
};

export interface IRecordModalFormProps {
  cells: ICellProps[];
  onSubmit: () => void;
}

const marginMap: { [key: string]: any } = {
  TEXT: 1,
  NUMBER: 1,
  MULTILINE_TEXT: 1,
};

const RecordModalForm: React.FC<IRecordModalFormProps> = ({ cells, onSubmit }) => (
  <form onSubmit={onSubmit}>
    {cells.map((cell) => {
      const { columnId, columnName, type } = cell;
      const TypeComponent = TYPE_MAP[type] || TYPE_MAP.DEFAULT;

      return (
        <ColumnContainer removeMarginBottom={marginMap[type]} key={columnId}>
          <TopContainer>
            <ColumnIcon icon={glyphs[FIELD_TYPES[type].icon]} size={{ width: 16, height: 16 }} />
            <ColumnTitle>{columnName}</ColumnTitle>
            {/* <DropdownIcon /> */}
          </TopContainer>
          <TypeComponent cell={cell} />
        </ColumnContainer>
      );
    })}
  </form>
);

export default RecordModalForm;
