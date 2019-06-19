export const TIME_OPTIONS = {
  HOURS: 'hours',
  DAYS: 'days',
};

export const TIME_DROPDOWN_OPTIONS = [
  {
    id: TIME_OPTIONS.HOURS,
    titleId: 'view.option.timeline.hours',
  },
  {
    id: TIME_OPTIONS.DAYS,
    titleId: 'view.option.timeline.days',
  },
];

export const TIME_CONFIG = {
  [TIME_OPTIONS.HOURS]: {
    groupDisplayFormat: 'MM/DD/YYYY',
    parent: 'day',
    groupSubheaderDisplayFormat: 'H',
  },
  [TIME_OPTIONS.DAYS]: {
    groupDisplayFormat: 'MMM YYYY',
    parent: 'month',
    groupSubheaderDisplayFormat: 'D',
  },
};

export const LEEWAY = 5;
export const DEFAULT_WIDTH = 30;
export const COLUMN_GROUP_LIMIT = 10;
