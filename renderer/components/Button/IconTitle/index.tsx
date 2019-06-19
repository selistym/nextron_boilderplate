import React from 'react';
import { FormattedMessage } from 'react-intl';

import Icon, { glyphs } from '@app/renderer/components/Icon';

import { ButtonContainer, IButtonContainer } from './styled';

export interface IButton extends IButtonContainer {
  className?: string;
  onClick: React.ReactEventHandler;
  icon?: string;
  isTabable?: boolean;
  titleId?: string;
  title?: string;
  iconSize?: { width: number; height: number };
}

const ButtonIconTitle: React.FC<IButton> = ({
  className,
  onClick,
  icon = glyphs.PLUS,
  iconSize = { width: 12, height: 12 },
  isTabable = true,
  titleId,
  title,
}) => (
  <ButtonContainer className={className} onClick={onClick} tabIndex={isTabable ? 0 : -1}>
    <Icon
      css={`
        margin-right: 5px;
      `}
      size={iconSize}
      icon={icon}
    />
    {title || <FormattedMessage id={titleId} />}
  </ButtonContainer>
);

export default ButtonIconTitle;
