/* eslint-disable no-constant-condition */
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import FerramentasDeDetalhe from '../../shared/components/Ferramenta-de-detalhe/FerramentasDeDetalhe'
import { useDebounce } from '../../shared/hooks'
import { LayoutBaseDePagina } from '../../shared/layouts'
import {
  RegisterProps,
  UserServices,
} from '../../shared/services/api/Auth/UserService'
import { ListaAdm } from './ListaAdm'

export const DetalheUser: React.FC = () => {
  const navigate = useNavigate()
  const { debounce } = useDebounce()
  const [rows, setRows] = useState<RegisterProps[]>([])

  useEffect(() => {
    debounce(() => {
      UserServices.getAll().then(result => {
        if (result instanceof Error) {
          alert(result.message)
          return
        } else {
          setRows(result.data)
        }
      })
    })
  }, [])
  console.log(rows)
  return (
    <ListaAdm>
      <LayoutBaseDePagina
        barraDeFerramentas={
          <FerramentasDeDetalhe
            mostarBotaoNovo={false}
            mostarBotaoSalvarEFechar
            mostarBotaoApagar={false}
            aoClicarEmVoltar={() => navigate('/adm-page')}
          />
        }
      >
        <Box>
          {rows.map(row => (
            <Box key={row.id}>
              <Typography>{row.name}</Typography>
              <Typography>{row.email}</Typography>
            </Box>
          ))}
        </Box>
      </LayoutBaseDePagina>
    </ListaAdm>
  )
}
