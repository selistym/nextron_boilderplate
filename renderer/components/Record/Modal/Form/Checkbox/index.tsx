import React from 'react';
import { Field } from 'react-final-form';

import FormInputCheckbox from '@app/renderer/components/Form/FormInputCheckbox';
import { ITypeComponent } from '@app/renderer/components/Record';

const RecordModalFormCheckbox: React.FC<ITypeComponent> = ({ className, cell }) => (
  <Field className={className} component={FormInputCheckbox} name={cell.columnId} isSmall={true} />
);

export default RecordModalFormCheckbox;
