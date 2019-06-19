import React from 'react';

import ColumnTypeAttachment from '../Attachment';
import ColumnTypeReference from '../Reference';
import ColumnTypeMultiSelect from '../Select/MultiSelect';
import ColumnTypeText from '../Text';

import { ITypeComponent } from '@app/renderer/components/Record';

const LOOKUP_RENDER_MAP: { [key: string]: any } = {
  TEXT: ColumnTypeText,
  NUMBER: ColumnTypeText,
  DATE: ColumnTypeText,
  MULTI_SELECT: ColumnTypeMultiSelect,
  SELECT: ColumnTypeMultiSelect,
  RECORD_REFERENCE: ColumnTypeReference,
  MULTI_ATTACHMENT: ColumnTypeAttachment,
};

const ColumnTypeLookup: React.FC<ITypeComponent> = ({ className, cell }) => {
  const {
    typeOptions: { resultType },
  } = cell;
  const Renderer = LOOKUP_RENDER_MAP[resultType] || ColumnTypeText;

  return <Renderer className={className} isDisabled={true} cell={cell} />;
};

export default ColumnTypeLookup;
