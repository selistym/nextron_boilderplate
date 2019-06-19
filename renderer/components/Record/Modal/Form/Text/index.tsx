import FormInputText from '@app/renderer/components/Form/FormInputText';
import React from 'react';
import { Field } from 'react-final-form';

import { ITypeComponent } from '@app/renderer/components/Record';

const ColumnTypeText: React.FC<ITypeComponent> = ({ className, isDisabled, cell }) => (
  <Field
    className={className}
    autoComplete="off"
    component={FormInputText}
    name={cell.columnId}
    isSmall={true}
    isDisabled={isDisabled}
  />
);

export default ColumnTypeText;
