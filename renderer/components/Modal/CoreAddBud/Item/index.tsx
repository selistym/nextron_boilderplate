import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import Button from '@app/components/Button';
import { Span1Mixin } from '@app/components/Shared/Typescale';

import { IDispatch, IRootState } from '@app/modules/store';

import { Container } from './styled';

type IConnectProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;
interface IProps extends IConnectProps {
  bud: {
    name: string;
    coreId: string;
    workspaceId: string;
    tableId: string;
    viewId: string;
  };
}

const AddBudItem: React.FC<IProps> = ({ addBudToCore, bud, isLoading }) => (
  <Container>
    <span css={Span1Mixin}>{bud.name}</span>
    <Button onClick={() => addBudToCore(bud)} isSmall={true} width={124} isLoading={isLoading}>
      <FormattedMessage id="global.add" />
    </Button>
  </Container>
);

const mapState = ({ coreBuds }: IRootState) => ({
  isLoading: coreBuds.loading.isLoadingAdd,
});

const mapDispatch = ({ coreBuds }: IDispatch) => ({
  addBudToCore: (payload) => coreBuds.addBudToCore(payload),
});

export default connect(
  mapState,
  mapDispatch,
)(AddBudItem);
