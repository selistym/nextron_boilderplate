import React from 'react';
import { FieldRenderProps } from 'react-final-form';

import Icon, { glyphs } from '@app/components/Icon';
import { CORE_ICONS } from '@app/constants/cores';

import { Container, IconItem } from './styled';

const icons = Object.keys(CORE_ICONS);

export interface ICoreFormAddColor extends FieldRenderProps<HTMLElement> {
  className?: string;
}

const CoreFormAddIcon: React.FC<ICoreFormAddColor> = ({
  className,
  input: { value, onChange },
}) => (
  <Container className={className}>
    {icons.map((icon: string, index: number) => (
      <IconItem isSelected={icon === value} onClick={() => onChange(icon as any)} key={index}>
        <Icon size={{ width: 30, height: 30 }} icon={glyphs[CORE_ICONS[icon]]} />
      </IconItem>
    ))}
  </Container>
);

export default CoreFormAddIcon;
