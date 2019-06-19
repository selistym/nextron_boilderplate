import React from 'react';

import { Container, Donut, ISpinner } from './styled';

const Spinner: React.FC<ISpinner> = ({ className, color, size, strokeWidth }) => (
  <Container className={className}>
    <Donut strokeWidth={strokeWidth} size={size} color={color} />
  </Container>
);

export default Spinner;
