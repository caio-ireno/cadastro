import { useField } from '@unform/core';
import { Input, InputProps } from '@mui/material';
import React, { useEffect, useRef } from 'react';

type VImageFieldProps = InputProps & {
  name: string;
};

export const VImageField: React.FC<VImageFieldProps> = ({ name, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files[0]',
      clearValue: (ref: HTMLInputElement) => {
        ref.value = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      <Input
        type="file"
        inputRef={inputRef}
        onClick={() => {
          error && clearError();
        }}
        {...rest}
      />
      {error && <span style={{ color: 'red' }}>{error}</span>}
      {defaultValue && <img src={defaultValue} alt="Imagem da notícia" />}
    </>
  );
};
