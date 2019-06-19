import React from 'react';

import { GROUPS } from '@app/renderer/modules/settings/fakaData';

import SettingsAccordion from '@app/renderer/components/Accordion';
import GroupItem from '@app/renderer/components/Settings/Sections/Group/Item';

import { Container, GroupItemStyle } from './styled';

const GroupSection: React.FC = () => {
  return (
    <SettingsAccordion title={`Groups (${GROUPS.length})`}>
      <Container>
        {GROUPS.map(({ id, name, color, cores, collaborators }: any) => (
          <GroupItem
            id={id}
            name={name}
            color={color}
            cores={cores}
            collaborators={collaborators}
            key={id}
            css={GroupItemStyle}
          />
        ))}
      </Container>
    </SettingsAccordion>
  );
};

export default GroupSection;
