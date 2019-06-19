import FormInputNumber from '@app/renderer/components/Form/FormInputNumber';
import React from 'react';
import { Field } from 'react-final-form';

import { ITypeComponent } from '@app/renderer/components/Record';

const ColumnTypeNumber: React.FC<ITypeComponent> = ({ className, cell }) => (
  <Field
    autoComplete="off"
    className={className}
    component={FormInputNumber}
    name={cell.columnId}
    isSmall={true}
    precision={cell.typeOptions.precision}
  />
);

export default ColumnTypeNumber;
