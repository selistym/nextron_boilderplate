import React from 'react';

import Icon, { glyphs } from '@app/renderer/components/Icon';

import { btnMixin, Container } from './styled';

const AddRowRenderer = () => {
  return (
    <Container>
      <Icon icon={glyphs.ADD} css={btnMixin} size={{ width: 15, height: 15 }} />
    </Container>
  );
};

export default AddRowRenderer;
