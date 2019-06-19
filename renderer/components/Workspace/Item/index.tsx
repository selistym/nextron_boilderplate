import React, { useCallback } from 'react';

import { Color, Container, Name } from './styled';

export interface IWorkspaceItem {
  id: string;
  workspaceOption: { name: string };
  className?: string;
  isActive: boolean;
  onClick: (workspaceId: string) => void;
}

const WorkspaceItem: React.FC<IWorkspaceItem> = ({
  isActive,
  id,
  workspaceOption,
  className,
  onClick,
}) => {
  const handleClick = useCallback(() => {
    onClick(id);
  }, []);

  return (
    <Container onClick={handleClick} className={className}>
      {/* <Color color={color} /> */}
      <Name isActive={isActive}>{workspaceOption.name}</Name>
    </Container>
  );
};

export default WorkspaceItem;
