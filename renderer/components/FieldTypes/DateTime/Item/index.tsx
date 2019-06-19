import React from 'react';

import { DateFormat, TimeFormat } from '@app/renderer/constants/fieldTypes';

import { textEllipsisMixin } from '@app/renderer/components/Shared';
import { getFormattedDateTime } from '@app/renderer/utils/date';

interface IProps {
  className?: string;
  value: string;
  timeFormat?: TimeFormat;
  dateFormat?: DateFormat;
}

const DateTimeItem: React.FC<IProps> = ({ className, value, timeFormat, dateFormat }) => {
  return (
    <span css={textEllipsisMixin} className={className}>
      {getFormattedDateTime(value, { dateFormat, timeFormat })}
    </span>
  );
};

export default DateTimeItem;
