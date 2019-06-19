import React, { Fragment } from 'react';
import { Field } from 'react-final-form';

import { FIELD_TYPES } from '@app/renderer/constants/fieldTypes';

import FormInputSelect from '@app/renderer/components/Form/FormInputSelect';
import FormInputSwitch from '@app/renderer/components/Form/FormInputSwitch';
import { FieldCSS, IFieldOptions } from '../shared';

const { dateFormatOptions, timeFormatOptions } = FIELD_TYPES.DATETIME;

const FieldOptionDate: React.FC<IFieldOptions> = ({ className, input: { value } }) => (
  <div className={className}>
    <Field
      css={FieldCSS}
      isSmall={true}
      titleId="form.field.option.dateFormat"
      name="typeOptions.dateFormat"
      options={dateFormatOptions}
      isIntl={true}
      component={FormInputSelect as any}
    />
    <Field
      css={FieldCSS}
      titleId="form.field.option.includeTimeField"
      name="typeOptions.includeTime"
      component={FormInputSwitch}
    />
    {value.includeTime && (
      <Fragment>
        <Field
          css={FieldCSS}
          isSmall={true}
          options={timeFormatOptions}
          titleId="form.field.option.timeFormat"
          name="typeOptions.timeFormat"
          isIntl={true}
          component={FormInputSelect as any}
        />
        <Field
          css={FieldCSS}
          titleId="form.field.option.useSameTimezone"
          name="typeOptions.useGMT"
          component={FormInputSwitch}
        />
      </Fragment>
    )}
  </div>
);

export default FieldOptionDate;
