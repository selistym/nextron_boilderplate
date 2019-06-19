import React from 'react';

import SettingsAccordion from '@app/renderer/components/Accordion';
import UserItem from '@app/renderer/components/User/Item';

import { ADMIN } from '@app/renderer/modules/settings/fakaData';

import { Container, UserItemStyle } from './styled';

const SectionAdmin: React.FC = () => (
  <SettingsAccordion title="Admin">
    <Container>
      {ADMIN.map(({ email, firstName, lastName, avatar }: any, index: number) => (
        <UserItem
          key={index}
          css={UserItemStyle}
          email={email}
          firstName={firstName}
          lastName={lastName}
          avatar={avatar}
        />
      ))}
    </Container>
  </SettingsAccordion>
);

export default SectionAdmin;
