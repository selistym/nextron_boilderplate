import React from 'react';
import { FieldRenderProps } from 'react-final-form';

import Icon, { glyphs } from '@app/components/Icon';
import { CORE_COLORS } from '@app/constants/cores';

import { ColorItem, Container } from './styled';

const colors = Object.keys(CORE_COLORS);

export interface ICoreFormAddColor extends FieldRenderProps<HTMLElement> {
  className?: string;
}

const CoreFormAddColor: React.FC<ICoreFormAddColor> = ({
  className,
  input: { value, onChange },
}) => (
  <Container className={className}>
    {colors.map((color: string, index: number) => (
      <ColorItem onClick={() => onChange(color as any)} key={index} color={CORE_COLORS[color]}>
        {value === color && <Icon icon={glyphs.CHECKBOX} size={{ height: 15, width: 15 }} />}
      </ColorItem>
    ))}
  </Container>
);

export default CoreFormAddColor;
