import { get } from 'lodash';

import { FIELD_TYPES } from '@app/constants/fieldTypes';
import moment from 'moment';

export const getLookupValue = (values: any[]) => {
  if (!values) return null;
  const type = get(values, `[0].type`);

  if (type === 'TEXT' || type === 'NUMBER') {
    return values.reduce((accum: string, cell: any) => {
      const valueByType = getValueByType(cell);
      if (!valueByType) return accum;
      return accum === '' ? valueByType : `${accum}, ${valueByType}`;
    }, '');
  }
  if (type === 'MULTI_SELECT' || type === 'SELECT' || type === 'MULTI_ATTACHMENT') {
    const accumSelect = values.reduce((accum: string, cell: any) => {
      const valueByType = getValueByType(cell);
      if (!valueByType) return accum;
      return accum.concat(JSON.parse(valueByType));
    }, []);

    return accumSelect;
  }
  if (type === 'RECORD_REFERENCE') {
    const accumSelect = values.reduce((accum: string, cell: any) => {
      return accum.concat(cell.foreignRow);
    }, []);
    return accumSelect;
  }
  if (type === 'DATETIME') {
    return values.reduce((accum: string, cell: any) => {
      const valueByType = getValueByType(cell);
      if (!valueByType) return accum;
      const formattedValue = valueByType && moment(valueByType).format('M/D/YYYY');
      return accum === '' ? formattedValue : `${accum}, ${formattedValue}`;
    }, '');
  }
};

const getValueByType = (cell: any) => {
  if (!cell.type) return;
  return cell[FIELD_TYPES[cell.type].valueKey];
};

export const getFlattenedLookupValue = (value: any[]) => {
  if (!value) return [];
  return getFlattenedData(value, 'lookup').filter((v: any) => v.type);
};

/** Helpers for recursion mapping */
const flattenByKey = (value: any, key: string) => {
  if (!value[key]) return value;

  return value[key].reduce((accum: any[], v: any) => accum.concat(flattenByKey(v, key)), []);
};

const getFlattenedData = (value: any[], key: string) => {
  return value.reduce((accum, v) => accum.concat(flattenByKey(v, key)), []);
};
