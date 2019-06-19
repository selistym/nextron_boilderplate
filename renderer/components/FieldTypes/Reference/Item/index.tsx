import { get } from 'lodash';
import React from 'react';

import { IReference } from '@app/renderer/modules/shared/type';

import { Container, Name } from './styled';

export interface IProps {
  className?: string;
  item: IReference;
}

const Reference: React.FC<IProps> = ({ className, item }) => (
  <Container className={`${className || ''} reference-item`}>
    <Name>{get(item, 'visibleName[0].value', '')}</Name>
  </Container>
);

export default Reference;
