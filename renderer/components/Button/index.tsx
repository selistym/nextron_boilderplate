import React from 'react';

import LoadingSpinner from '@app/renderer/components/Loading/Spinner';

import { ButtonContainer, IButtonContainer } from './styled';
export interface IButton extends IButtonContainer {
  children: React.ReactNode;
  className?: string;
  onClick: (event: React.MouseEvent) => void;
}

const Button: React.FC<IButton> = ({
  className,
  children,
  onClick,
  isLoading,
  isDisabled,
  isSecondary,
  isSmall,
  isFullWidth,
  width,
}) => (
  <ButtonContainer
    className={className}
    onClick={onClick}
    disabled={isDisabled}
    isDisabled={isDisabled}
    isLoading={isLoading}
    isSecondary={isSecondary}
    isSmall={isSmall}
    isFullWidth={isFullWidth}
    width={width}
  >
    {isLoading ? <LoadingSpinner size="small" strokeWidth="2px" color="white" /> : children}
  </ButtonContainer>
);

export default Button;
