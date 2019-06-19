import React from 'react';

import Icon, { glyphs } from '@app/renderer/components/Icon';

import { Button, Container, IconStyle } from './styled';

// TODO @Mutation: Add a row
const AddRow = () => (
  <Container>
    <Button onClick={() => {}}>
      <Icon size={{ width: 15, height: 15 }} icon={glyphs.PLUS} css={IconStyle} />
    </Button>
  </Container>
);

export default AddRow;
