import React from 'react';
import { Field } from 'react-final-form';

import { ITypeComponent } from '@app/renderer/components/Record';
import MultiSelectForm from './Form';

const ColumnTypeMultiSelect: React.FC<ITypeComponent> = ({ className, isDisabled, cell }) => (
  <Field
    className={className}
    cell={cell}
    component={MultiSelectForm as any}
    name={cell.columnId}
    isDisabled={isDisabled}
  />
);

export default ColumnTypeMultiSelect;
