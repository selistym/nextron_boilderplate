import React from 'react';

import { textEllipsisMixin } from '@app/renderer/components/Shared';

interface IProps {
  className?: string;
  value: number;
  precision?: number;
}

const NumberItem: React.FC<IProps> = ({ className, value, precision }) => {
  return (
    <span css={textEllipsisMixin} className={className}>
      {value ? value.toFixed(precision) : ''}
    </span>
  );
};

export default NumberItem;
