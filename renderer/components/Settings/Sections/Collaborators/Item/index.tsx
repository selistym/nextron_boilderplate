import React, { useCallback } from 'react';

import UserItem from '@app/renderer/components/User/Item';

import { Container, coreNumberMixin, RightContainer, UserItemMixin } from './styled';

export interface ICollaboratorItem {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  cores: any[];
  onClick?: (userId: string) => void;
  className?: string;
  avatar?: string;
}

const CollaboratorItem: React.FC<ICollaboratorItem> = ({
  className,
  onClick,
  userId,
  email,
  cores,
  firstName,
  lastName,
  avatar,
}) => {
  const handleClick = useCallback(() => {
    if (onClick) onClick(userId);
  }, []);

  return (
    <Container className={className} onClick={handleClick}>
      <UserItem
        css={UserItemMixin}
        email={email}
        firstName={firstName}
        lastName={lastName}
        avatar={avatar}
      />
      <RightContainer>
        <span css={coreNumberMixin}>{`${cores.length} Cores`}</span>
      </RightContainer>
    </Container>
  );
};

export default CollaboratorItem;
