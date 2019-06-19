import { Link } from '@app/renderer/routes';
import React from 'react';

import Icon, { IIcon } from '@app/renderer/components/Icon';

import { ButtonContainer, IButtonContainer } from './styled';

export interface IButton extends IButtonContainer {
  className?: string;
  iconProps: IIcon;
  isTabable?: boolean;
  href: string;
}

const ButtonLinkIcon: React.FC<IButton> = ({ className, href, iconProps, isTabable = true }) => (
  <Link route={href}>
    <a>
      <ButtonContainer className={className} tabIndex={isTabable ? 0 : -1}>
        <Icon {...iconProps} />
      </ButtonContainer>
    </a>
  </Link>
);

export default ButtonLinkIcon;
