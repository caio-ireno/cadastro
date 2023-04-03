import { Grid, Icon, IconButton, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { FerramentasDaLista } from '../../shared/components'
import { useDebounce } from '../../shared/hooks'
import {
  HistoriaService,
  TextoProps,
} from '../../shared/services/api/historia/HistoriaService'
import { ListaAdm } from './ListaAdm'

export const HistoriaAdm: React.FC = () => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const [rows, setRows] = useState<TextoProps[]>([])
  const { debounce } = useDebounce()
  const navigate = useNavigate()

  useEffect(() => {
    debounce(() => {
      HistoriaService.getAll().then(result => {
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
      HistoriaService.deleteById(id).then(result => {
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
        mostarInputBusca
        textoBotaoNovo="nova"
        aoClicarEmNovo={() => navigate('/adm-page/lojas/nova')}
      />

      <Grid
        display="flex"
        justifyContent={'center'}
        fontWeight={'bold'}
        container
        textAlign="center"
        fontSize={15}
        m="auto"
      >
        <Grid item xs={smDown ? 3 : 1}>
          Texto
        </Grid>
      </Grid>

      {rows.map(row => (
        <Grid
          display="flex"
          justifyContent={'center'}
          container
          textAlign={'center'}
          mt={4}
          key={row.id}
          fontSize={15}
        >
          <Grid item xs={smDown ? 3 : 1}>
            <IconButton onClick={() => handleDelete(row.id)}>
              <Icon fontSize={'small'}>delete</Icon>
            </IconButton>
            <IconButton onClick={() => navigate(`/adm-page/lojas/${row.id}`)}>
              <Icon fontSize={'small'}>edit</Icon>
            </IconButton>
          </Grid>
          <Grid item xs={smDown ? 3 : 2}>
            {row.texto}
          </Grid>
        </Grid>
      ))}
    </ListaAdm>
  )
}
