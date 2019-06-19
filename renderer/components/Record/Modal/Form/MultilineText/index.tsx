import React from 'react';
import { Field } from 'react-final-form';

import FormInputTextArea from '@app/renderer/components/Form/FormInputTextArea';

import { ITypeComponent } from '@app/renderer/components/Record';

const ColumnTypeMultilineText: React.FC<ITypeComponent> = ({ className, cell }) => (
  <Field className={className} component={FormInputTextArea} name={cell.columnId} isSmall={true} />
);

export default ColumnTypeMultilineText;
