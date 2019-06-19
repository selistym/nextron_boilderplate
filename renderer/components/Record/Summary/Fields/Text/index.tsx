import React from 'react';

import { Container, Span } from './styled';

interface IRecordSummaryText {
  value: string;
}

const RecordSummaryText: React.FC<IRecordSummaryText> = ({ value }) => (
  <Container>
    <Span>{value}</Span>
  </Container>
);

export default RecordSummaryText;
