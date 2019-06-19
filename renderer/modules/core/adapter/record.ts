import { get } from 'lodash';

import { ICellProps } from '@app/components/Record';
import { FIELD_TYPES } from '@app/constants/fieldTypes';

import { getFlattenedLookupValue, getLookupValue } from './lookup';

export const adaptRecord = (row: any, columns: any[]) => {
  const { id, cells } = row;
  let cellsMap: { [key: string]: any } = {};
  if (cells) {
    cellsMap = cells.reduce((map: { [key: string]: any }, cell: any) => {
      map[cell.columnId] = cell;
      return map;
    }, {});
  }

  // get records cells value
  let adaptedCells: ICellProps[] = [];
  adaptedCells = columns.map((column) => {
    const { id: columnId, type, name: columnName, typeOptions } = column!;
    // we should copy typeOptions here because columns is the same array reference
    const adaptTypeOptions = typeOptions && { ...typeOptions };
    const cell = cellsMap[columnId];
    let value = cell && cell[FIELD_TYPES[type].valueKey];
    if (type === 'LOOKUP') {
      value = getFlattenedLookupValue(value);
      adaptTypeOptions.resultType = get(value, `[0].type`);
    }
    const adaptValue = adaptRecordValue(type, value);

    return {
      type,
      columnId,
      columnName,
      typeOptions: adaptTypeOptions,
      value: adaptValue,
      cellId: '',
    };
  });

  // get record title
  let title = 'Unnamed Record';
  if (columns) {
    const firstColumn = columns[0];
    if (firstColumn) {
      const firstCell = cellsMap[firstColumn.id];
      if (firstCell) {
        title = firstCell.text;
      }
    }
  }

  return {
    title,
    rowId: id,
    cells: adaptedCells,
  };
};

export const adaptRecordValue = (type: string, value: any) => {
  let adaptValue = value;
  if (type === 'SELECT' || type === 'MULTI_SELECT' || type === 'MULTI_ATTACHMENT') {
    if (value && typeof value === 'string') {
      adaptValue = JSON.parse(value);
    }
  } else if (type === 'RECORD_REFERENCE') {
    adaptValue = value
      ? value.map((item: any) => ({
          foreignRowId: item.id,
          foreignRowName: get(item, 'visibleName[0].value', 'Unnamed record'),
        }))
      : [];
  } else if (type === 'LOOKUP') {
    const lookupType = get(value, `[0].type`);
    adaptValue = adaptRecordValue(lookupType, getLookupValue(value));
  }
  return adaptValue;
};
