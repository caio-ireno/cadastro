import { TextField, TextFieldProps } from '@mui/material';
import { Box } from '@mui/system';
import { useField } from '@unform/core';
import React, { useEffect, useState } from 'react';

type VTextFieldProps = TextFieldProps & {
  name: string;
};

export const VTextField: React.FC<VTextFieldProps> = ({ name, ...rest }) => {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField(name);
  const [value, setValue] = useState<string | number>(defaultValue || '');

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, NewValue) => setValue(NewValue),
    });
  }, [registerField, fieldName, value]);

  return (
    <TextField
      color="primary"
      {...rest}
      error={!!error}
      helperText={error}
      defaultValue={defaultValue}
      onKeyDown={(e) => {
        error && clearError();
        rest.onKeyDown?.(e);
      }}
      value={value}
      onChange={(e) => {
        const newValue = e.target.value;
        const isNumber = !isNaN(parseInt(newValue));
        setValue(isNumber ? parseFloat(newValue) : newValue);
        rest.onChange?.(e);
      }}
    />
  );
};
