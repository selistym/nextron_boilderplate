import React from 'react';
import { Field } from 'react-final-form';

import { ITypeComponent } from '@app/renderer/components/Record';
import SingleSelectForm from './Form';

const ColumnTypeSingleSelect: React.FC<ITypeComponent> = ({ className, cell }) => (
  <Field
    className={className}
    component={SingleSelectForm as any}
    cell={cell}
    name={cell.columnId}
  />
);

export default ColumnTypeSingleSelect;
