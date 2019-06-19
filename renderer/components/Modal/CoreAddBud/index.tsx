import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { IDispatch } from '@app/renderer/modules/store';

import ButtonIcon from '@app/renderer/components/Button/Icon';
import { glyphs } from '@app/renderer/components/Icon';
import { darkBtnMixin } from '@app/renderer/components/Shared';
import { AVAILABLE_BUDS } from '@app/renderer/modules/coreBuds/constants';
import StackWrapper from '../StackWrapper';
import AddBudItem from './Item';

import { H4Mixin } from '@app/renderer/components/Shared/Typescale';
import { Container, HeaderContainer } from './styled';

type IConnectProps = ReturnType<typeof mapDispatch>;
interface IProps extends IConnectProps {
  modalIndex: number;
}

// We can hardcode for now, later it will be taken from the users available bud list that they have purchased.
const ModalCoreAddBud: React.FC<IProps> = ({ removeStackModal, modalIndex }) => (
  <StackWrapper onClose={removeStackModal} modalIndex={modalIndex}>
    <Container>
      <HeaderContainer>
        <h4 css={H4Mixin}>
          <FormattedMessage id="coreBuds.btn.addBuds.title" />
        </h4>
        <ButtonIcon
          onClick={removeStackModal}
          css={darkBtnMixin}
          iconProps={{ icon: glyphs.REMOVE, size: { height: 14, width: 14 } }}
        />
      </HeaderContainer>
      <div>
        {Object.keys(AVAILABLE_BUDS).map((budType: string, idx: number) => (
          <AddBudItem bud={AVAILABLE_BUDS[budType]} key={idx} />
        ))}
      </div>
    </Container>
  </StackWrapper>
);

const mapDispatch = ({ app, coreBuds }: IDispatch) => ({
  addBudToCore: (payload) => coreBuds.addBudToCore(payload),
  removeStackModal: () => app.removeStackModal(),
});

export default connect(
  () => ({}),
  mapDispatch,
)(ModalCoreAddBud);
