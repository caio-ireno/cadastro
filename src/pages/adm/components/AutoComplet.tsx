import { Autocomplete, Box, TextField } from '@mui/material'
import { useField } from '@unform/core'
import { useEffect, useMemo, useState } from 'react'

import { useDebounce } from '../../../shared/hooks'
import { TipoSorveteService } from '../../../shared/services/api/tipo sorvete/TipoSorvete'

type AutoCompleteOption = {
  label: string
  id: number
}

export const AutoComplet: React.FC = () => {
  const { fieldName, registerField, error, clearError } = useField('sorvete_id')

  const [selectedId, setSelectedId] = useState<number | undefined>(undefined)

  const [opcoes, setOpcoes] = useState<AutoCompleteOption[]>([])
  const { debounce } = useDebounce()

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
    })
  }, [registerField, fieldName, selectedId])

  useEffect(() => {
    debounce(() => {
      TipoSorveteService.getAll().then(result => {
        if (result instanceof Error) {
          alert(result.message)
          return
        } else {
          setOpcoes(
            result.data.map(o => ({
              label: o.tipo,
              id: o.id,
            })),
          )
        }
      })
    })
  }, [])

  const autoCompletSelectedOption = useMemo(() => {
    if (!selectedId) return null

    const SelectedOption = opcoes.find(opcao => opcao.id === selectedId)
    if (!selectedId) return null
    return SelectedOption
  }, [selectedId, opcoes])

  return (
    <Box width={'100%'} sx={{ backgroundColor: ' #fff ', borderRadius: 2 }}>
      <Autocomplete
        openText="Abrir"
        closeText="Fechar"
        noOptionsText="Sem Opção"
        loadingText="Carregando..."
        disablePortal
        value={autoCompletSelectedOption}
        // popupIcon={isLoading ? <CircularProgress size={28} /> : undefined}
        // loading={isLoading}
        options={opcoes}
        onChange={(_, newValue) => {
          setSelectedId(newValue?.id)
          clearError()
        }}
        renderInput={params => (
          <TextField
            {...params}
            error={!!error}
            helperText={error}
            label="Tipo de sorvete"
          />
        )}
      />
    </Box>
  )
}
