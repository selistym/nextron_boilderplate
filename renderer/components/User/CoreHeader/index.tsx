import Icon, { glyphs } from '@app/renderer/components/Icon';
import React from 'react';

import { AccountNameStyle, Container } from './styled';

const USER_INFO = {
  name: 'Juliana G',
  avatar: 'DEFAULT_AVATAR',
};

interface IProps {
  onClick?: () => void;
}

const UserCoreHeader: React.FC<IProps> = ({ onClick }) => (
  <Container isDisabled={!onClick} onClick={onClick}>
    <AccountNameStyle>{USER_INFO.name}</AccountNameStyle>
    <Icon icon={glyphs[USER_INFO.avatar]} size={{ width: 32, height: 32 }} />
  </Container>
);

export default UserCoreHeader;
