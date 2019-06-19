/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AddTableInput } from './../../../types/graphql-global-types';

// ====================================================
// GraphQL mutation operation: AddTableMutation
// ====================================================

export interface AddTableMutation_addTable {
  __typename: 'TableId';
  id: string;
}

export interface AddTableMutation {
  addTable: AddTableMutation_addTable | null;
}

export interface AddTableMutationVariables {
  addTableInput: AddTableInput;
}
