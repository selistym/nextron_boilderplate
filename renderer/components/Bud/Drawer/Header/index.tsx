import React from 'react';
import { FormattedMessage } from 'react-intl';

import ButtonIcon from '@app/renderer/components/Button/Icon';
import { glyphs } from '@app/renderer/components/Icon';
import { darkBtnMixin } from '@app/renderer/components/Shared';

import { H4Mixin } from '@app/renderer/components/Shared/Typescale';
import { Container } from './styled';

interface IProps {
  onClose: () => void;
}

const DrawerHeader: React.FC<IProps> = ({ onClose }) => (
  <Container>
    <h4 css={H4Mixin}>
      <FormattedMessage id="global.buds" />
    </h4>
    <ButtonIcon
      onClick={onClose}
      css={darkBtnMixin}
      iconProps={{ icon: glyphs.REMOVE, size: { height: 14, width: 14 } }}
    />
  </Container>
);

export default DrawerHeader;
