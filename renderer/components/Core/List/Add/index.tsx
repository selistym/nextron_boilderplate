import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import Icon, { glyphs } from '@app/renderer/components/Icon';
import { StackModalType } from '@app/renderer/constants/modals';

import { IDispatch } from '@app/renderer/modules/store';

import { AddName, Container, IconContainer } from './styled';

type IConnectProps = ReturnType<typeof mapDispatch>;

const CoreListAdd: React.FC<IConnectProps> = ({ addStackModal }) => (
  <Container>
    <IconContainer onClick={addStackModal}>
      <Icon icon={glyphs.ADD} size={{ width: 40, height: 40 }} />
    </IconContainer>
    <AddName>
      <FormattedMessage id="core.list.addCore.title" />
    </AddName>
  </Container>
);

const mapDispatch = ({ app }: IDispatch) => ({
  addStackModal: () => app.addStackModal({ type: StackModalType.AddCore }),
});

export default connect(
  () => ({}),
  mapDispatch,
)(CoreListAdd);
