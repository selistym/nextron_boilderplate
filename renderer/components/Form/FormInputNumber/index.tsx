import React, { useCallback, useState } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { InjectedIntl, injectIntl } from 'react-intl';

import FormError from '../Error';

import { isNumberAllowKeyPress } from '@app/renderer/utils/keyboard';

import { Input, InputContainer, InputTitle } from './styled';

export interface IFormInputNumber extends FieldRenderProps<HTMLElement> {
  className?: string;
  id?: string;
  intl: InjectedIntl;
  isDisabled?: boolean;
  isSmall?: boolean;
  placeholderId?: string;
  titleId?: string;
  autoComplete?: string;
  precision?: number;
}

const FormInputNumber: React.FC<IFormInputNumber> = ({
  className,
  id,
  input: { name, onChange, onFocus, value },
  intl: { formatMessage },
  isSmall,
  meta: { active, error, submitError, submitting, touched, invalid, dirtySinceLastSubmit },
  placeholderId,
  titleId,
  autoComplete,
  precision,
}) => {
  const errorMsg = error || submitError;
  const isValidationError = invalid && touched && !!error;
  const isSubmitError = !!invalid && !dirtySinceLastSubmit && !!submitError;
  const isError = (isValidationError || isSubmitError) && !submitting;

  const [inputValue, setInputValue] = useState(
    (value || value === 0) && (precision || precision === 0) ? value.toFixed(precision) : value,
  );

  const handleKeydown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    if (!isNumberAllowKeyPress[key] && '1234567890.-'.indexOf(key) < 0) {
      e.preventDefault();
    }
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const handleBlur = useCallback(
    () => {
      const numberValue = Number(inputValue);
      if (numberValue || numberValue === 0) {
        onChange(numberValue as any);
        if (precision || precision === 0) setInputValue(numberValue.toFixed(precision));
      } else {
        setInputValue(value);
      }
    },
    [inputValue],
  );

  return (
    <InputContainer className={className}>
      {titleId && <InputTitle isSmall={isSmall}>{formatMessage({ id: titleId })}</InputTitle>}
      <Input
        autoComplete={autoComplete}
        isSmall={isSmall}
        disabled={submitting}
        id={id}
        isDisabled={submitting}
        isError={isError}
        isFocused={!!active}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={onFocus}
        onKeyDown={handleKeydown}
        placeholder={placeholderId ? formatMessage({ id: placeholderId }) : ''}
        value={inputValue}
      />
      {isError && <FormError isSmall={isSmall} error={errorMsg} />}
    </InputContainer>
  );
};

export default injectIntl(FormInputNumber);
