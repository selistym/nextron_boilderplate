import apollo from '@app/renderer/utils/api';

import { GET_CELL_WITH_DEPTH_QUERY } from '@app/renderer/graphql/core/getCellWithDepth.query';
import { GET_CORE_QUERY } from '@app/renderer/graphql/core/getCore.query';
import { GET_VIEWS_QUERY } from '@app/renderer/graphql/core/getViews.query';
import { ADD_COLUMN_MUTATION } from '@app/renderer/graphql/table/addColumn.mutation';
import { ADD_ROW_MUTATION } from '@app/renderer/graphql/table/addRow.mutation';
import { ADD_TABLE_MUTATION } from '@app/renderer/graphql/table/addTable.mutation';
import { ADD_VIEW_MUTATION } from '@app/renderer/graphql/table/addView.mutation';
import { UPDATE_CELL_MUTATION } from '@app/renderer/graphql/table/updateCell.mutation';

import { GetCoreQuery, GetCoreQuery_workspace } from '@app/renderer/graphql/core/types/GetCoreQuery';
import { GetViewsQuery } from '@app/renderer/graphql/core/types/GetViewsQuery';

import {
  AddColumnInput,
  AddRowInput,
  AddTableInput,
  AddViewInput,
  UpdateCellInput,
  WorkspaceIdInput,
} from '@app/renderer/types/graphql-global-types';

export const getCore = async (
  workspaceIdInput: WorkspaceIdInput,
  ids: { coreId: string; tableId?: string; viewId?: string },
  includeOptions: boolean,
  includeView: boolean,
): Promise<GetCoreQuery> => {
  const response = await apollo.query({
    query: GET_CORE_QUERY,
    variables: {
      workspaceIdInput,
      ...ids,
      includeOptions,
      includeView,
    },
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  });

  return response.data;
};

export const getViews = async (
  workspaceIdInput: WorkspaceIdInput,
  coreId: string,
  tableId: string,
): Promise<GetViewsQuery> => {
  const response = await apollo.query({
    query: GET_VIEWS_QUERY,
    variables: {
      workspaceIdInput,
      coreId,
      tableId,
    },
    fetchPolicy: 'network-only',
  });

  return response.data;
};

export const getCellWithDepth = async (
  rowId: string,
  columnId: string,
  depth: number,
): Promise<GetViewsQuery> => {
  const response = await apollo.query({
    query: GET_CELL_WITH_DEPTH_QUERY,
    variables: {
      rowId,
      columnId,
      depth,
    },
    fetchPolicy: 'network-only',
  });

  return response.data.getCellByColumnAndRowId;
};

export const addViewToCore = async (
  addViewInput: AddViewInput,
): Promise<GetCoreQuery_workspace> => {
  const response = await apollo.mutate({
    mutation: ADD_VIEW_MUTATION,
    variables: { addViewInput },
  });
  return response.data.addView;
};

export const addTableToCore = async (
  addTableInput: AddTableInput,
): Promise<GetCoreQuery_workspace> => {
  const response = await apollo.mutate({
    mutation: ADD_TABLE_MUTATION,
    variables: { addTableInput },
  });
  return response.data.addTable;
};

export const addColumnToCore = async (addColumnInput: AddColumnInput) => {
  const response = await apollo.mutate({
    mutation: ADD_COLUMN_MUTATION,
    variables: { addColumnInput },
  });

  return response.data.addColumn;
};

export const addRowToCore = async (addRowInput: AddRowInput) => {
  const response = await apollo.mutate({
    mutation: ADD_ROW_MUTATION,
    variables: { addRowInput },
  });
  return response.data.addRow;
};

export const updateCellInCore = async (updateCellInput: UpdateCellInput) => {
  const response = await apollo.mutate({
    mutation: UPDATE_CELL_MUTATION,
    variables: { updateCellInput },
  });
  return response.data.updateCell;
};

/**
 * Hardcoded for now. Cell updates will contain the columnId and rowId.
 * @param cellUpdates
 * @param cellMetadata
 */
export const updateMultipleRowCells = async (cellUpdates, cellMetadata) => {
  try {
    await Promise.all(
      cellUpdates.map(async (update) => {
        return updateCellInCore({
          ...update,
          workspaceId: cellMetadata.workspaceId,
          coreId: cellMetadata.coreId,
          tableId: cellMetadata.tableId,
        });
      }),
    );
  } catch (err) {
    // tslint:disable-next-line: no-console
    console.warn('Error occured on updateMultipleRowCells: ', err);
  }
};
