import React from 'react';

import { Container, OptionMixin } from './styled';

interface IRecordSummaryOption {
  value: any[];
}

const RecordSummaryAttachment: React.FC<IRecordSummaryOption> = ({ value = [] }) => (
  <Container>
    {value.map((option, index) => (
      <img css={OptionMixin} key={index} alt="" src={option.url} />
    ))}
  </Container>
);

export default RecordSummaryAttachment;
