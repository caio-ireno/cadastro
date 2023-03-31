import { Grid, Icon, IconButton, useMediaQuery, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { FerramentasDaLista } from '../../shared/components'
import { useDebounce } from '../../shared/hooks'
import {
  AllTypes,
  SorveteProps,
} from '../../shared/services/api/sorvete/AllTypes'
import { TipoSorveteService } from '../../shared/services/api/tipo sorvete/TipoSorvete'
import { ListaAdm } from './ListaAdm'

export const TipoSorveteAdms: React.FC = () => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const [rows, setRows] = useState<SorveteProps[]>([])
  const navigate = useNavigate()
  const { debounce } = useDebounce()

  useEffect(() => {
    debounce(() => {
      AllTypes.getAll().then(result => {
        console.log(result)

        if (result instanceof Error) {
          alert(result.message)
          return
        } else {
          setRows(result.data)
        }
      })
    })
  }, [])

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      TipoSorveteService.deleteTypeById(id).then(result => {
        if (result instanceof Error) {
          alert(result.message)
        } else {
          setRows(oldRows => {
            return [...oldRows.filter(oldRow => oldRow.id !== id)]
          })
          alert('Registro Apagado com sucesso')
        }
      })
    }
  }

  return (
    <ListaAdm>
      <FerramentasDaLista
        textoBotaoNovo="nova"
        aoClicarEmNovo={() => navigate('/adm-page/tipo-sorvete/nova')}
      />
      <Box p={1}>
        <Grid
          display="flex"
          fontWeight={'bold'}
          container
          textAlign="center"
          fontSize={15}
          m="auto"
          justifyContent={'center'}
        >
          <Grid item xs={smDown ? 4 : 1}>
            Ação
          </Grid>
          <Grid item xs={smDown ? 4 : 2}>
            Nome
          </Grid>
        </Grid>

        {rows.map(row => (
          <Grid
            container
            textAlign={'center'}
            mt={4}
            key={row.id}
            fontSize={15}
            display="flex"
            justifyContent={'center'}
          >
            <Grid item xs={smDown ? 3 : 1}>
              <IconButton onClick={() => handleDelete(row.id)}>
                <Icon fontSize={'small'}>delete</Icon>
              </IconButton>
              <IconButton
                onClick={() => navigate(`/adm-page/tipo-sorvete/${row.id}`)}
              >
                <Icon fontSize={'small'}>edit</Icon>
              </IconButton>
            </Grid>
            <Grid item xs={smDown ? 4 : 2}>
              {row.tipo}
            </Grid>
          </Grid>
        ))}
      </Box>
    </ListaAdm>
  )
}
