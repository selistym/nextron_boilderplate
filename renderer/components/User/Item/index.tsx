import React from 'react';

import Icon, { glyphs } from '@app/renderer/components/Icon';

import { Container, EmailMixin, NameMixin, RightContainer, ShortName } from './styled';

interface IUserItem {
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  className?: string;
}

const UserItem: React.FC<IUserItem> = ({ className, email, firstName, lastName, avatar }) => {
  const userName = `${firstName} ${lastName}`;
  const shortName = userName
    .split(' ')
    .map((item) => item[0])
    .join('');

  return (
    <Container className={className}>
      {avatar ? (
        <Icon size={{ width: 32, height: 32 }} icon={glyphs[avatar]} />
      ) : (
        <ShortName>{shortName}</ShortName>
      )}
      <RightContainer>
        <span css={NameMixin}>{userName}</span>
        <span css={EmailMixin}>{email}</span>
      </RightContainer>
    </Container>
  );
};

export default UserItem;
