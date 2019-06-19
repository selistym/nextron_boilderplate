import { Router } from '@app/renderer/routes';
import React from 'react';

import { Button } from './styled';

interface IProps {
  activeIds: any;
  colorCode: string;
  isLastTab: boolean;
  isFirstTab: boolean;
  isLight: boolean;
  tableOption: any;
}

const TabSectionTab: React.FC<IProps> = ({
  activeIds: { workspaceId, coreId, tableId },
  colorCode,
  tableOption,
  isLight,
  isLastTab,
  isFirstTab,
}) => (
  <Button
    activeTab={tableId === tableOption.id}
    isLastTab={isLastTab}
    isFirstTab={isFirstTab}
    isLight={isLight}
    color={colorCode}
    onClick={(e: React.SyntheticEvent) => {
      e.preventDefault();
      if (tableId !== tableOption.id) {
        const newRoute = `/core/${workspaceId}/${coreId}/${tableOption.id}/${tableOption
          .viewOptionsAllIds[0] || ''}`;
        Router.pushRoute(newRoute);
      }
    }}
  >
    <span>{tableOption.name}</span>
  </Button>
);

export default TabSectionTab;
