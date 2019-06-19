import React from 'react';
import { Field } from 'react-final-form';

import FormInputDatePicker from '@app/renderer/components/Form/FormInputDatePicker';
import { ITypeComponent } from '@app/renderer/components/Record';

const RecordModalFormDate: React.FC<ITypeComponent> = ({ className, cell }) => (
  <Field
    className={className}
    component={FormInputDatePicker}
    name={cell.columnId}
    isSmall={true}
    typeOptions={cell.typeOptions}
  />
);

export default RecordModalFormDate;
