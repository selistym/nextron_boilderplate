import { arrayToObject } from '@app/utils';

export const adaptExtractionRules = (rules) =>
  rules.map((rule) => ({
    name: rule.visibleName[0].value,
    value: rule.id,
  }));

export const adaptTreelabRows = (rows, type) => rows.map((r) => adaptTreelabRow(r, type));

export const adaptTreelabRow = (row, type) => ({
  type,
  id: row.id,
  ...arrayToObject(row.cells, 'columnId'),
});
