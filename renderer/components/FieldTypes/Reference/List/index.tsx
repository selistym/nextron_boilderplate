import React from 'react';

import ReferenceItem from '../Item';

import { IReference } from '@app/renderer/modules/shared/type';

import { Container } from './styled';

export interface IProps {
  className?: string;
  items: IReference[];
}

const ReferenceList: React.FC<IProps> = ({ className, items }) => (
  <Container className={className}>
    {items.map((item: IReference, index: number) => (
      <ReferenceItem key={index} item={item} />
    ))}
  </Container>
);

export default ReferenceList;
