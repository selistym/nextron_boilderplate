import React from 'react';

import { ICellProps } from '@app/renderer/components/Record';

import { adaptSummaryValue } from '@app/renderer/utils/record';

import { ITEM_MAP } from '../../';

interface IRecordSummaryLookup {
  value: any;
  cell: ICellProps;
}
const RecordSummaryLookup: React.FC<IRecordSummaryLookup> = ({ cell, value }) => {
  const type = cell.typeOptions.resultType;
  const Renderer = ITEM_MAP[type] || ITEM_MAP.DEFAULT;
  return <Renderer value={adaptSummaryValue({ type, value })} />;
};

export default RecordSummaryLookup;
