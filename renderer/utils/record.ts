import { differenceWith, isEqual } from 'lodash';

import { getFormattedDateValue, getFormattedTimeValue } from '@app/utils/date';

export const adaptSummaryValue = (cell: any) => {
  const { type, value, typeOptions } = cell;
  if (type === 'Number') {
    if (!typeOptions) return value;
    const { precision } = typeOptions;
    return value ? value.toFixed(precision) : '';
  }
  if (type === 'DATETIME') {
    if (!typeOptions) return value;
    return `${getFormattedDateValue(value, typeOptions)} ${getFormattedTimeValue(
      value,
      typeOptions,
    )}`;
  }
  if (type === 'RECORD_REFERENCE') {
    return value
      ? value.map((item: any) => ({
          id: item.foreignRowId,
          name: item.foreignRowName,
          color: 'red',
        }))
      : [];
  }
  if (type === 'SELECT') {
    return value ? [value] : [];
  }
  return value;
};

export const submitRecord = ({
  values,
  initialValues,
  cell,
  rowId,
  updateCell,
  removeStackModal,
}: any) => {
  const { columnId, type } = cell;
  const newValue = values[columnId];
  const oldValue = initialValues[columnId];
  if (!isEqual(newValue, oldValue)) {
    const action = {
      value: { type },
      type: 'SET_VALUE',
    };
    if (type === 'RECORD_REFERENCE') {
      action.type = 'ADD_VALUE';
      const differenceRows = differenceWith(newValue, oldValue, isEqual);
      differenceRows.forEach((foreignRowId) => {
        updateCell({
          rowId,
          columnId,
          action: { ...action, value: { ...action.value, foreignRowId } },
        });
      });
    } else if (type === 'NUMBER') {
      action.value.number = newValue;
      updateCell({ action, rowId, columnId });
    } else if (type === 'TEXT') {
      action.value.text = newValue;
      updateCell({ action, rowId, columnId });
    } else if (type === 'DATETIME') {
      action.value.dateTime = newValue;
      updateCell({ action, rowId, columnId });
    } else if (type === 'MULTI_SELECT') {
      action.value.selectedItems = newValue;
      updateCell({ action, rowId, columnId });
    } else if (type === 'SELECT') {
      action.value.selectedItem = newValue;
      updateCell({ action, rowId, columnId });
    } else if (type === 'MULTI_ATTACHMENT') {
      action.value.attachments = newValue;
      updateCell({ action, rowId, columnId });
    }
  }
  removeStackModal();
};
