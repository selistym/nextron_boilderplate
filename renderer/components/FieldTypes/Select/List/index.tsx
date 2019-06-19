import React from 'react';

import SelectItem from '../Item';

import { ISelect } from '@app/renderer/modules/shared/type';

import { Container } from './styled';

export interface IProps {
  className?: string;
  items: ISelect[];
}

const SelectList: React.FC<IProps> = ({ className, items }) => (
  <Container className={className}>
    {items.map((item: ISelect, index: number) => (
      <SelectItem key={index} item={item} />
    ))}
  </Container>
);

export default SelectList;
