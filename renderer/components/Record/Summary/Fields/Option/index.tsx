import React from 'react';

import Option, { IOption } from '@app/renderer/components/Option';

import { Container, OptionMixin } from './styled';

interface IRecordSummaryOption {
  value: IOption[];
}

const RecordSummaryOption: React.FC<IRecordSummaryOption> = ({ value = [] }) => (
  <Container>
    {value.map((option, index) => (
      <Option css={OptionMixin} key={index} option={option} />
    ))}
  </Container>
);

export default RecordSummaryOption;
