import Router from 'next/router';

import { FIELD_TYPES } from '@app/renderer/constants/fieldTypes';
import { LookupStatus, ValueSource } from '@app/renderer/constants/grid';

import { GetCoreQuery } from '@app/renderer/graphql/core/types/GetCoreQuery';

import { IAttachment } from '../shared/type';
import { ICellContent } from './types';

/**
 * This should pop up a modal, but for now we are checking the response to see if there
 * are no tables, or no views, or no cores etc. It is to safe check the data that we can actually render.
 */
export const checkResponse = ({ workspace }: GetCoreQuery) => {
  // tslint:disable-next-line: no-console
  if (!workspace) return Router.push('/workspace-not-found');
  const cores = workspace.cores;
  // tslint:disable-next-line: no-console
  if (!cores || !cores[0]) return Router.push('/core-not-found');
  const tables = cores[0].tableOptions || cores[0].tables;
  // tslint:disable-next-line: no-console
  if (!tables || !tables[0]) return Router.push('/tables-not-found');
  const views = tables[0].views || tables[0].viewOptions;
  // tslint:disable-next-line: no-console
  if (!views || !views[0]) return Router.push('/views-not-found');
};

/** Grid Helpers */
export const updateLocalCell = (payload, getRowNode, source: ValueSource) => {
  const { rowId, columnId, action } = payload;
  const row = getRowNode(rowId);
  const valueKey = FIELD_TYPES[action.value.type].valueKey;
  const value: ICellContent = {
    columnId,
    source,
    content: action.value[valueKey],
    type: action.type,
  };

  if (action.value.type === 'RECORD_REFERENCE') {
    const foreignRowId = action.value.foreignRowId;
    const rowColumnData = row.data[columnId] && row.data[columnId].content;
    value.content = rowColumnData ? [...rowColumnData] : [];

    if (
      action.type === 'ADD_VALUE' &&
      value.content.findIndex((item: any) => item.id === foreignRowId) >= 0
    ) {
      return;
    }
    value.content.push({ id: foreignRowId });
  }

  row.setDataValue(columnId, value);
};

export const formatCell = (change) => ({
  content: change,
  source: ValueSource.Self,
});

/** Lookup Helpers */
/**
 * Payload and present should accept and return a full list of rowIds and updates, right now it is
 * only accepting one.
 */
export const convertPayloadIntoPresent = (payload): ICellsToUpdate => {
  return {
    [payload.rowId]: [payload.columnId],
  };
};

interface ICellsToUpdate {
  // Row ID with array of Column IDs
  [key: string]: string[];
}

/**
 * Inputs an object of rowIds with an array of column Ids. ex: { 'rec124': ['col123', 'col234'] }
 * If there is updateData then it means it just retrieved new content. It then builds the updates
 * for ag-grid api to consume.
 */
export const updateMultipleCells = (
  updateRowData: any,
  getRowNode: any,
  updates: ICellsToUpdate,
  updateData?: any, // New content retrieved from server
) => {
  const itemsToUpdate: any[] = [];

  Object.keys(updates).forEach((rowId) => {
    const rowNode = getRowNode(rowId);
    if (rowNode) itemsToUpdate.push(getRowToUpdate(rowNode.data, updates[rowId], updateData));
  });

  updateRowData({ update: itemsToUpdate });
};

/**
 * Takes an array of column ids, and an array of updated data for each column, creates an object
 * that can be used with ag-grid transaction update api. (An object for the row node that has all the
 * column ids and their respective data)
 */
const getRowToUpdate = (prevRow, columnIds: string[], updateData?: any) => {
  const rowToPush: any = {};

  columnIds.forEach((id: string) => {
    rowToPush[id] = {
      status: updateData ? LookupStatus.IsComplete : LookupStatus.IsLoading,
      source: ValueSource.Sub,
      content: updateData || (prevRow[id] && prevRow[id].content),
    };
  });

  return { ...prevRow, ...rowToPush };
};

/** List Helpers */
export const updateLocalListCell = (payload, getRowNode, source: ValueSource) => {
  const { rowId, columnId, action } = payload;
  // get list row data
  const row = getRowNode(rowId); // { id, listcontent: { content: [{ columnId }]}}
  const { rows } = row.data.listContent;
  // Now we need to see if we even need to do any updates by looking at content to see if our thing is there.
  // This is a limitation, we need to actually see if this column is being seen
  const idxToUpdate = rows.findIndex((l) => l.columnId === columnId);

  // If the column isn't even present, lets do nothing
  if (idxToUpdate < 0) return;
  // ----------------------------------------//
  // Other wise, theres actually stuff we need to update. This code is the same as grid update, lets refactor later
  const valueKey = FIELD_TYPES[action.value.type].valueKey;
  const value: ICellContent = {
    columnId,
    source,
    content: action.value[valueKey],
    type: action.value.type,
  };

  if (action.value.type === 'RECORD_REFERENCE') {
    const foreignRowId = action.value.foreignRowId;
    const rowColumnData = row.data[columnId] && row.data[columnId].content;
    value.content = rowColumnData ? [...rowColumnData] : [];

    if (
      action.type === 'ADD_VALUE' &&
      value.content.findIndex((item: any) => item.id === foreignRowId) >= 0
    ) {
      return;
    }
    value.content.push({ id: foreignRowId });
  }

  // Okay, after we got the row back, lets put it back in a new left or right object
  const newContent =
    idxToUpdate > -1
      ? rows
          .slice(0, idxToUpdate)
          .concat([value])
          .concat(rows.slice(idxToUpdate + 1))
      : rows;

  row.setData({
    ...row.data,
    listContent: {
      ...row.data.listContent,
      rows: newContent,
    },
  });
};

/** Field Type Helpers */

export const prepareSetText = (text: string) => ({
  type: 'SET_VALUE',
  value: { text, type: 'TEXT' },
});

export const prepareSetNumber = (number: number) => ({
  type: 'SET_VALUE',
  value: { number, type: 'NUMBER' },
});

export const prepareSetDateTime = (dateTime: string) => ({
  type: 'SET_VALUE',
  value: { dateTime, type: 'DATE_TIME' },
});

export const prepareSetMultiSelect = (selectedItems: Array<{ id: string }>) => ({
  type: 'SET_VALUE',
  value: { selectedItems, type: 'MULTI_SELECT' },
});

export const prepareSetSelect = (selectedItem: { id: string }) => ({
  type: 'SET_VALUE',
  value: { selectedItem, type: 'SELECT' },
});

export const prepareSetMultiAttachment = (attachments: IAttachment[]) => ({
  type: 'SET_VALUE',
  value: { attachments, type: 'MULTI_ATTACHMENT' },
});

export const prepareAddRecordRef = (recordId: string) => ({
  type: 'ADD_VALUE',
  value: { type: 'RECORD_REFERENCE', foreignRowId: recordId },
});
