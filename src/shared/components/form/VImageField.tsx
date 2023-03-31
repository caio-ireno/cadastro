import { useField } from '@unform/core'
import React, { useEffect, useRef } from 'react'

interface Props {
  name: string
}

type InputProps = JSX.IntrinsicElements['input'] & Props

export const VImageField: React.FC<InputProps> = ({ name, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, registerField, defaultValue, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files[0]',
      clearValue: (ref: HTMLInputElement) => {
        ref.value = ''
      },
    })
  }, [fieldName, registerField])

  return (
    <div>
      <input
        type="file"
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
      {error && <span>{error}</span>}
    </div>
  )
}
