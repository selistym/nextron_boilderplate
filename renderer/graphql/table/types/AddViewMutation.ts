/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AddViewInput } from './../../../types/graphql-global-types';

// ====================================================
// GraphQL mutation operation: AddViewMutation
// ====================================================

export interface AddViewMutation_addView {
  __typename: 'ViewId';
  id: string;
}

export interface AddViewMutation {
  addView: AddViewMutation_addView | null;
}

export interface AddViewMutationVariables {
  addViewInput: AddViewInput;
}
