import { Link } from '@app/renderer/routes';
import React from 'react';

import Icon, { glyphs } from '@app/renderer/components/Icon';
import { CORE_COLORS, CORE_ICONS } from '@app/renderer/constants/cores';

import DropdownButton from './DropdownButton';

import { isLightTheme } from '@app/renderer/utils/core';

import { Container, DarkStyle, DropdownStyle, H3, IconContainer, Name, WhiteStyle } from './styled';

export interface ICoreListItem {
  className?: string;
  core: any;
  activeWorkspaceId: string;
}

const CoreListItem: React.FC<ICoreListItem> = ({ className, core, activeWorkspaceId }) => (
  <Container className={className}>
    <Link key={core.id} route={`/core/${activeWorkspaceId}/${core.id}`}>
      <IconContainer color={CORE_COLORS[core.color]}>
        {core.icon === 'untitle' ? (
          <H3 css={isLightTheme(core.color) ? DarkStyle : WhiteStyle}>
            {core.name ? core.name.slice(0, 2).toUpperCase() : 'Un'}
          </H3>
        ) : (
          <Icon
            icon={glyphs[CORE_ICONS[core.icon]]}
            css={isLightTheme(core.color) ? DarkStyle : WhiteStyle}
            size={{ width: 48, height: 48 }}
          />
        )}
      </IconContainer>
    </Link>
    <DropdownButton css={DropdownStyle} coreId={core.id} />
    <Name>{core.name}</Name>
  </Container>
);

export default React.memo(CoreListItem);
