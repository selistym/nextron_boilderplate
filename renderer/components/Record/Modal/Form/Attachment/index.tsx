import React from 'react';
import { Field } from 'react-final-form';

import { ITypeComponent } from '@app/renderer/components/Record';
import AttachmentForm from './Form';

const ColumnTypeAttachment: React.FC<ITypeComponent> = ({ className, cell, isDisabled }) => (
  <Field
    className={className}
    component={AttachmentForm as any}
    isDisabled={isDisabled}
    name={cell.columnId}
  />
);

export default ColumnTypeAttachment;
