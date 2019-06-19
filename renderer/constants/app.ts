export const AUTH_TOKEN = 'treelab-auth';
export const ACCEPTED_LOCALES = ['en', 'zh'];
export const DEFAULT_LOCALE = 'en';

export const KEY_CODES = {
  ARROW_RIGHT: 39,
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_DOWN: 40,
  BACKSPACE: 8,
  DELETE: 46,
  ENTER: 13,
  ESC: 27,
  NUM_0: 48,
  ALPHA_Z: 90,
  TAB: 9,
};

// TODO @Derek: This needs to change to internationalized ID.
export const TEXT_FILTERS = [
  { name: 'Equals', value: 'equals' },
  { name: 'Not equal', value: 'notEqual' },
  { name: 'Starts with', value: 'startsWith' },
  { name: 'Ends with', value: 'endsWith' },
  { name: 'Contains', value: 'contains' },
  { name: 'Not contains', value: 'notContains' },
];

export const NUMBER_FILTERS = [
  { name: '=', value: 'equals' },
  { name: '≠', value: 'notEqual' },
  { name: '<', value: 'lessThan' },
  { name: '≤', value: 'lessThanOrEqual' },
  { name: '>', value: 'greaterThan' },
  { name: '≥', value: 'greaterThanOrEqual' },
];
