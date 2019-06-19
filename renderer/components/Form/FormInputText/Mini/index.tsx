import React, { useCallback, useEffect, useState } from 'react';

export interface IProps {
  className?: string;
  value?: string;
  onSubmit: (value?: string) => void;
}

import { Input } from './styled';

const FormInputTextMini: React.FC<IProps> = ({ className, value, onSubmit }) => {
  const [inputValue, setInputValue] = useState(value || '');

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    [inputValue],
  );

  useEffect(() => setInputValue(value || ''), [value]);

  return (
    <form
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(inputValue);
      }}
    >
      <Input
        onBlur={() => onSubmit(inputValue)}
        className={className}
        onChange={handleChange}
        value={inputValue}
      />
    </form>
  );
};

export default FormInputTextMini;
