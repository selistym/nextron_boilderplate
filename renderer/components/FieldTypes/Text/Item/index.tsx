import React from 'react';

import { textEllipsisMixin } from '@app/renderer/components/Shared';

interface IProps {
  value: string;
}

const TextItem: React.FC<IProps> = ({ value }) => <span css={textEllipsisMixin}>{value}</span>;

export default TextItem;
