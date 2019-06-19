import { NextContext } from 'next';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { IDispatch, IRootState } from '@app/renderer/modules/store';

import Header from '@app/renderer/components/Header';
import Spinner from '@app/renderer/components/Loading/Spinner';
import AdminSection from '@app/renderer/components/Settings/Sections/Admin';
import CollaboratorSection from '@app/renderer/components/Settings/Sections/Collaborators';
import GroupSection from '@app/renderer/components/Settings/Sections/Group';
import TitleSection from '@app/renderer/components/Settings/Sections/Title';
import WorkspaceSection from '@app/renderer/components/Settings/Sections/Workspace';

import { Container, Wrapper } from '@app/renderer/components/Shared/Layout';
import { Content, LeftSection, RightSection, SectionContainer, SpinnerWrapper } from './styled';

type IConnectProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

interface IProps extends IConnectProps {
  urlWorkspaceId?: string;
}

const Settings: React.FC<IProps> = ({
  urlWorkspaceId,
  isLoading,
  getAllWorkspaceOptionsAndUsers,
}) => {
  useEffect(
    () => {
      getAllWorkspaceOptionsAndUsers(urlWorkspaceId);
    },
    [urlWorkspaceId],
  );

  return (
    <Wrapper>
      <Container>
        <Header />
        {isLoading ? (
          <SpinnerWrapper>
            <Spinner size="medium" strokeWidth="4px" />
          </SpinnerWrapper>
        ) : (
          <Content>
            <LeftSection>
              <WorkspaceSection />
            </LeftSection>
            <RightSection>
              <TitleSection />
              <SectionContainer>
                <AdminSection />
                {/* <GroupSection /> */}
                <CollaboratorSection />
              </SectionContainer>
            </RightSection>
          </Content>
        )}
      </Container>
    </Wrapper>
  );
};

Settings.getInitialProps = (context: NextContext) => {
  const { workspaceId } = context.query;
  return { urlWorkspaceId: workspaceId };
};

const mapState = ({ settings }: IRootState) => ({
  isLoading: settings.loading.isLoading,
});

const mapDispatch = ({ settings }: IDispatch) => ({
  getAllWorkspaceOptionsAndUsers: (id?: string) => settings.getAllWorkspaceOptionsAndUsers(id),
});

export default connect(
  mapState,
  mapDispatch,
)(Settings);
