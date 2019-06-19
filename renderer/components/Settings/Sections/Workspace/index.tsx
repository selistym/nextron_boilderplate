import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { Span2MediumMixin } from '@app/renderer/components/Shared/Typescale';
import WorkspaceItem from '@app/renderer/components/Workspace/Item';

import { IRootState } from '@app/renderer/modules/store';

import { Router } from '@app/renderer/routes';

import { Container, TopContainer, WorkspaceContainer } from './styled';

type IConnectProps = ReturnType<typeof mapState>;

const WorkspaceSection: React.FC<IConnectProps> = ({
  activeWorkspaceId,
  workspacesById,
  workspacesAllIds,
}) => {
  const handleClick = useCallback((workspaceId: string) => {
    Router.pushRoute(`/settings/workspace/${workspaceId}`);
  }, []);

  return (
    <Container>
      <TopContainer>
        <span css={Span2MediumMixin}>
          <FormattedMessage id="settings.section.workspace.title" />
        </span>
      </TopContainer>
      <WorkspaceContainer>
        {workspacesAllIds.map((workspaceId: string) => (
          <WorkspaceItem
            onClick={handleClick}
            isActive={activeWorkspaceId === workspaceId}
            key={workspaceId}
            id={workspaceId}
            workspaceOption={workspacesById[workspaceId]}
          />
        ))}
      </WorkspaceContainer>
    </Container>
  );
};

const mapState = ({ settings: { activeWorkspaceId, workspaceOptions } }: IRootState) => ({
  activeWorkspaceId,
  workspacesById: workspaceOptions.byId,
  workspacesAllIds: workspaceOptions.allIds,
});

export default connect(mapState)(WorkspaceSection);
