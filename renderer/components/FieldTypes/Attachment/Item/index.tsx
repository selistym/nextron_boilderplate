import React from 'react';

import { IAttachment } from '@app/renderer/modules/shared/type';

import { Image } from './styled';

export interface IProps {
  className?: string;
  item: IAttachment;
}

const Attachment: React.FC<IProps> = ({ className, item }) => (
  <Image src={item.url} alt="" className={`${className || ''} attachment-item`} />
);

export default Attachment;
