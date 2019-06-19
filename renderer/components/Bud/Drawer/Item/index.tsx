import React from 'react';

import { Span1MediumMixin } from '@app/renderer/components/Shared/Typescale';
import BudItemExtraction from './Extraction';

import { AVAILABLE_BUDS, BudType } from '@app/renderer/modules/coreBuds/constants';

import { Container, Header } from './styled';

const budInstanceMeta = AVAILABLE_BUDS[BudType.EXTRACTION].budInstance;
const BudDrawerItem = ({ budRow }) => {
  return (
    <Container>
      <Header>
        <span css={Span1MediumMixin}>{budRow[budInstanceMeta.column.name].text}</span>
      </Header>
      {(() => {
        switch (budRow.type) {
          case BudType.EXTRACTION:
            return <BudItemExtraction budRow={budRow} />;
          default:
            return null;
        }
      })()}
    </Container>
  );
};

export default BudDrawerItem;
