import React from 'react';

import AttachmentItem from '../Item';

import { IAttachment } from '@app/renderer/modules/shared/type';

import { Container } from './styled';

export interface IProps {
  className?: string;
  items: IAttachment[];
}

const AttachmentList: React.FC<IProps> = ({ className, items }) => (
  <Container className={className}>
    {items.map((item: IAttachment, index: number) => (
      <AttachmentItem key={index} item={item} />
    ))}
  </Container>
);

export default AttachmentList;
