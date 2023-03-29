import { useField } from '@unform/core';
import { Input, InputProps } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

type VImageFieldProps = InputProps & {
  name: string;
};

export const VImageField: React.FC<VImageFieldProps> = ({ name, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField(name);

  const [imageRoute, setImageRoute] = useState<string>(defaultValue || '');

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

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImageRoute((e.target?.result as string) || '');
      };

      reader.readAsDataURL(file);
    } else {
      setImageRoute('');
    }
  }

  return (
    <>
      <Input
        type="file"
        inputRef={inputRef}
        onClick={() => {
          error && clearError();
        }}
        onChange={handleImageChange}
        {...rest}
      />
      {error && <span style={{ color: 'red' }}>{error}</span>}
      {imageRoute && <img src={imageRoute} alt="Imagem da notícia" />}
    </>
  );
};
