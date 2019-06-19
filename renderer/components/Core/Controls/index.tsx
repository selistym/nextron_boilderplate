import React from 'react';

// import Filter from './Filter';
import HideColumn from './HideColumn';
import TimeMeasure from './TimeMeasure';
import ViewOptions from './ViewOptions';

import { Container, Section } from './styled';

const CoreControls: React.FC = () => (
  <Container>
    <Section>
      <ViewOptions />
      {/* <Filter /> */}
      <HideColumn />
    </Section>
    <Section>
      <TimeMeasure />
    </Section>
  </Container>
);

export default React.memo(CoreControls);
