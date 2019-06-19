import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from '@app/renderer/components/Button';

import { Container } from './styled';

interface IProps {
  onAddBudClick: () => void;
}

const DrawerFooter: React.FC<IProps> = ({ onAddBudClick }) => (
  <Container>
    <Button onClick={onAddBudClick} isFullWidth={true}>
      <FormattedMessage id="coreBuds.btn.addBuds.title" />
    </Button>
  </Container>
);

export default DrawerFooter;
