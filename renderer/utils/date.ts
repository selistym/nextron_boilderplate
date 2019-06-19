import Moment, { Moment as IMoment } from 'moment';

import { DATE_FORMAT, TIME_FORMAT } from '@app/renderer/constants/fieldTypes';

import { IDateTimeTypeOptions } from '@app/renderer/modules/shared/types';

const DATE_MOMENT_MAP = {
  [DATE_FORMAT.LOCAL]: 'M/D/YYYY',
  [DATE_FORMAT.FRIENDLY]: 'MMM Do, YYYY',
  [DATE_FORMAT.EURO]: 'D/M/YYYY',
  [DATE_FORMAT.ISO]: 'YYYY-MM-DD',
};

const TIME_MOMENT_MAP = {
  [TIME_FORMAT.TWELVE_HOUR]: 'h:mm a',
  [TIME_FORMAT.TWOFOUR_HOUR]: 'HH:mm',
};

export const getFormattedDateTime = (value: string, typeOptions: IDateTimeTypeOptions) => {
  return `${getFormattedDateValue(value, typeOptions)} ${getFormattedTimeValue(
    value,
    typeOptions,
  )}`;
};

export const getFormattedDateValue = (value: string, typeOptions: IDateTimeTypeOptions) => {
  const dateFormat = typeOptions.dateFormat || DATE_FORMAT.LOCAL;

  return value && Moment(value).format(DATE_MOMENT_MAP[dateFormat]);
};

export const getFormattedTimeValue = (value: string, typeOptions: IDateTimeTypeOptions) => {
  if (!typeOptions.includeTime) return '';
  const timeFormat = typeOptions.timeFormat || TIME_FORMAT.TWOFOUR_HOUR;

  return value && Moment(value).format(TIME_MOMENT_MAP[timeFormat]);
};

export const getMomentFormat = (typeOptions: IDateTimeTypeOptions) => {
  const dateFormat = typeOptions.dateFormat || DATE_FORMAT.LOCAL;
  const timeFormat = typeOptions.timeFormat || TIME_FORMAT.TWOFOUR_HOUR;

  return `${DATE_MOMENT_MAP[dateFormat]} ${TIME_MOMENT_MAP[timeFormat]}`;
};

export const getDateMoment = (value: string, typeOptions: IDateTimeTypeOptions) => {
  const dateFormat = typeOptions.dateFormat || DATE_FORMAT.LOCAL;

  return Moment(value, DATE_MOMENT_MAP[dateFormat]);
};

export const formatDate = (moment: IMoment, dateFormat: string) => {
  return moment.format(DATE_MOMENT_MAP[dateFormat]);
};

export const getTimePickerOptions = (minuteStep: number = 30, isHours24: boolean = true) => {
  const options = [];

  if (isHours24) {
    for (let i = 0; i < 24; i = i + 1) {
      for (let j = 0; j < 60; j = j + minuteStep) {
        options.push(`${i < 10 ? `0${i}` : i}:${j < 10 ? `0${j}` : j}`);
      }
    }
  } else {
    for (let i = 0; i < 60; i = i + minuteStep) {
      options.push(`12:${i < 10 ? `0${i}` : i} am`);
    }

    for (let i = 1; i < 12; i = i + 1) {
      for (let j = 0; j < 60; j = j + minuteStep) {
        options.push(`${i}:${j < 10 ? `0${j}` : j} am`);
      }
    }

    for (let i = 0; i < 60; i = i + minuteStep) {
      options.push(`12:${i < 10 ? `0${i}` : i} PM`);
    }

    for (let i = 1; i < 12; i = i + 1) {
      for (let j = 0; j < 60; j = j + minuteStep) {
        options.push(`${i}:${j < 10 ? `0${j}` : j} PM`);
      }
    }
  }

  return options;
};
