import React from 'react';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import Button from '@app/renderer/components/Button';
import FormInputText from '@app/renderer/components/Form/FormInputText';

import {
  composeValidators,
  emailFormat,
  passwordFormat,
  required,
} from '../../../utils/validation';

export interface ILoginForm {
  [propName: string]: any;
}

const LoginForm: React.FC<ILoginForm> = ({ handleSubmit, submitting, hasValidationErrors }) => (
  <form onSubmit={handleSubmit} style={{ width: '400px' }}>
    <Field
      component={FormInputText}
      name="email"
      titleId="form.login.title.email"
      type="email"
      validate={composeValidators(required('Email is required'), emailFormat('Invalid email'))}
    />
    <Field
      component={FormInputText}
      name="password"
      css={`
        margin-bottom: 10px;
      `}
      titleId="form.login.title.password"
      type="password"
      validate={composeValidators(
        required('Password is required'),
        passwordFormat('Invalid password'),
      )}
    />
    <Button
      onClick={handleSubmit}
      css={`
        width: 100%;
      `}
      isDisabled={hasValidationErrors}
      isLoading={submitting}
    >
      <FormattedMessage id="form.login.button.signIn" />
    </Button>
  </form>
);

export default LoginForm;
