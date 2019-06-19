import React from 'react';
import { Field } from 'react-final-form';

import { ITypeComponent } from '@app/renderer/components/Record';
import RecordReferenceForm from './Form';

const ColumnTypeReference: React.FC<ITypeComponent> = ({ className, isDisabled, cell }) => (
  <Field
    className={className}
    component={RecordReferenceForm as any}
    cell={cell}
    name={cell.columnId}
    isDisabled={isDisabled}
  />
);

export default ColumnTypeReference;
