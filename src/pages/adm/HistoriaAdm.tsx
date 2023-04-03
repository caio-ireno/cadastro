import {
  Box,
  Icon,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDebounce } from '../../shared/hooks'
import {
  HistoriaProps,
  HistoriaService,
} from '../../shared/services/api/historia/HistoriaService'
import { ListaAdm } from './ListaAdm'

export const HistoriaAdm: React.FC = () => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const [rows, setRows] = useState<HistoriaProps[]>([])
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

  return (
    <ListaAdm>
      <Typography
        display="flex"
        justifyContent={'center'}
        fontWeight={'bold'}
        textAlign="center"
        fontSize={15}
        m="auto"
        mt={2}
      >
        Texto
      </Typography>

      {rows.map(row => (
        <Box
          display="flex"
          justifyContent={'center'}
          textAlign={'center'}
          px={4}
          mt={2}
          key={row.id}
          fontSize={15}
          gap={5}
        >
          <Box display={'flex'} flexDirection={'row'}>
            <IconButton
              onClick={() => navigate(`/adm-page/historias/${row.id}`)}
            >
              <Icon fontSize={'small'}>edit</Icon>
            </IconButton>
          </Box>
          <Typography fontSize={smDown ? 10 : 15}>{row.texto}</Typography>
        </Box>
      ))}
    </ListaAdm>
  )
}
