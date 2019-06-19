import React from 'react';

import { SELECT_COLOR } from '@app/renderer/constants/color';

import { ISelect } from '@app/renderer/modules/shared/type';

import { Container, Name } from './styled';

export interface IProps {
  className?: string;
  item: ISelect;
}

const Select: React.FC<IProps> = ({ className, item }) => (
  <Container className={`${className || ''} select-item`} color={SELECT_COLOR[item.color]}>
    <Name>{item.name}</Name>
  </Container>
);

export default Select;
