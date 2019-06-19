import React from 'react';
import { connect } from 'react-redux';

import CoreListAdd from './Add';
import CoreListItem from './Item';

import { IRootState } from '@app/renderer/modules/store';

import { Container, ListStyle, Title } from './styled';

type IConnectProps = ReturnType<typeof mapState>;

const CoreList: React.FC<IConnectProps> = ({ activeWorkspaceId, coresById, coresAllIds }) => (
  <Container>
    <Title>Caminer</Title>
    {coresAllIds.map((coreId: string) => (
      <CoreListItem
        key={coreId}
        css={ListStyle}
        core={coresById[coreId]}
        activeWorkspaceId={activeWorkspaceId}
      />
    ))}
    <CoreListAdd />
  </Container>
);

const mapState = ({ cores: { cores, activeWorkspace, activeWorkspaceId } }: IRootState) => ({
  activeWorkspaceId,
  coresById: cores.byId,
  coresAllIds: activeWorkspace.cores,
});

export default connect(mapState)(CoreList);
