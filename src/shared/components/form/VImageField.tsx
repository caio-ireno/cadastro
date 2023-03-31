import { Button } from '@mui/material'
import { Box } from '@mui/system'
import { useField } from '@unform/core'
import React, { useEffect, useRef, useState } from 'react'

interface Props {
  name: string
}

type InputProps = JSX.IntrinsicElements['input'] & Props

export const VImageField: React.FC<InputProps> = ({ name, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, registerField, defaultValue, error } = useField(name)
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(defaultValue)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files[0]',
      clearValue: (ref: HTMLInputElement) => {
        ref.value = ''
        setPreviewUrl(undefined)
      },
    })
  }, [fieldName, registerField])

  const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      setPreviewUrl(undefined)
      return
    }
    const preview = URL.createObjectURL(file)
    setPreviewUrl(preview)
  }

  const handleButtonClick = () => {
    inputRef.current?.click()
  }

  return (
    <Box
      display={'flex'}
      flexDirection="column"
      gap={3}
      alignItems="center"
      justifyContent={'center'}
    >
      <Button
        color="inherit"
        sx={{
          ':hover': {
            backgroundColor: '#AED6F1',
            borderRadius: '10px',
          },
          borderRadius: '10px',
          border: '2px solid',
        }}
        onClick={handleButtonClick}
      >
        {previewUrl ? 'Nome do arquivo: ' + previewUrl : 'Escolher uma imagem'}
      </Button>
      <input
        style={{
          backgroundColor: '#85C1E9',
          opacity: 0,

          position: 'absolute',
        }}
        accept="image/*"
        required
        type="file"
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        onChange={handlePreview}
        {...rest}
      />
      {previewUrl && (
        <img src={previewUrl} alt="Preview" style={{ maxWidth: '200px' }} />
      )}
      {error && <span>{error}</span>}
    </Box>
  )
}
