import React from 'react';

import { COLLABORATORS } from '@app/renderer/modules/settings/fakaData';

import SettingsAccordion from '@app/renderer/components/Accordion';
import CollaboratorItem from '@app/renderer/components/Settings/Sections/Collaborators/Item';

import { Container, ItemMixin } from './styled';

const CollaboratorSection: React.FC = () => {
  return (
    <SettingsAccordion title={`Individual Collaborators (${COLLABORATORS.length})`}>
      <Container>
        {COLLABORATORS.map(({ userId, email, firstName, lastName, cores }: any, index: number) => (
          <CollaboratorItem
            userId={userId}
            email={email}
            firstName={firstName}
            lastName={lastName}
            cores={cores}
            css={ItemMixin}
            key={index}
          />
        ))}
      </Container>
    </SettingsAccordion>
  );
};

export default CollaboratorSection;
