import React, { useCallback } from 'react';

import { CORE_COLORS } from '@app/renderer/constants/cores';

import {
  Color,
  Container,
  coreNumberMixin,
  FirstLine,
  memberMixin,
  NameMixin,
  RightContainer,
} from './styled';

export interface IGroupItem {
  id: string;
  name: string;
  color: string;
  cores: any[];
  collaborators: any[];
  onClick?: (groupId: string) => void;
  className?: string;
}

const GroupItem: React.FC<IGroupItem> = ({
  className,
  onClick,
  id,
  name,
  color,
  cores,
  collaborators,
}) => {
  const handleClick = useCallback(() => {
    if (onClick) onClick(id);
  }, []);

  const shortName = name
    .split(' ')
    .map((item) => item[0])
    .join('');

  const emails = collaborators.map((collaborator) => collaborator.email).join(', ');

  return (
    <Container className={className} onClick={handleClick}>
      <Color color={CORE_COLORS[color]}>{shortName}</Color>
      <RightContainer>
        <FirstLine>
          <span css={NameMixin}>{name}</span>
          <span css={coreNumberMixin}>{`${cores.length} Cores`}</span>
        </FirstLine>
        <span css={memberMixin}>{`${collaborators.length} members`}</span>
        <span css={memberMixin}>{emails}</span>
      </RightContainer>
    </Container>
  );
};

export default GroupItem;
