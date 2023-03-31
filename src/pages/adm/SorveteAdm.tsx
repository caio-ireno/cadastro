/* eslint-disable indent */
import {
  Box,
  Grid,
  Icon,
  IconButton,
  Pagination,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { FerramentasDaLista } from '../../shared/components'
import { useDebounce } from '../../shared/hooks'
import {
  AllTypes,
  ListaSorveteProps,
} from '../../shared/services/api/sorvete/AllTypes'
import { ListaAdm } from './ListaAdm'

export const SorveteAdm: React.FC = () => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const [searchParams, setSearchParams] = useSearchParams()
  const { debounce } = useDebounce()

  const navigate = useNavigate()

  const [rows, setRows] = useState<ListaSorveteProps[]>([])
  const [totalCount, SetTotalCount] = useState(0)

  const busca = useMemo(() => {
    return searchParams.get('busca') || ''
  }, [searchParams])

  const page = useMemo(() => {
    return Number(searchParams.get('page') || '1')
  }, [searchParams])

  useEffect(() => {
    debounce(() => {
      AllTypes.getAllSabores(page).then(result => {
        if (result instanceof Error) {
          alert(result.message)
          return
        } else {
          setRows(result.data.data)
          console.log(result.data)
          SetTotalCount(100)
        }
      })
    })
  }, [page])

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      AllTypes.deleteById(id).then(result => {
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

  const ITEMS_PER_PAGE = 10 // or any other value you want

  const totalPages = useMemo(() => {
    return Math.ceil(totalCount / ITEMS_PER_PAGE)
  }, [totalCount])

  return (
    <ListaAdm>
      <FerramentasDaLista
        textoBusca={busca}
        aoMudarTextoBusca={texto =>
          setSearchParams({ busca: texto, page: '1' }, { replace: true })
        }
        mostarInputBusca
        aoClicarEmNovo={() => navigate('/adm-page/sorvetes/nova')}
      />
      <Box p={1}>
        <Grid
          display="flex"
          justifyContent={'center'}
          fontWeight={'bold'}
          container
          textAlign="center"
          fontSize={15}
          m="auto"
        >
          <Grid item xs={smDown ? 3 : 2}>
            Ação
          </Grid>
          <Grid item xs={smDown ? 3 : 2}>
            Nome
          </Grid>
          <Grid item xs={smDown ? 3 : 2}>
            Tipo
          </Grid>
          {!smDown && (
            <Grid item xs={smDown ? 3 : 2}>
              Descrição
            </Grid>
          )}
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
            <Grid item xs={smDown ? 3 : 2}>
              <IconButton onClick={() => handleDelete(row.id)}>
                <Icon fontSize={'small'}>delete</Icon>
              </IconButton>
              <IconButton
                onClick={() => navigate(`/adm-page/sorvetes/${row.id}`)}
              >
                <Icon fontSize={'small'}>edit</Icon>
              </IconButton>
            </Grid>
            <Grid item xs={smDown ? 3 : 2}>
              {row.nome}
            </Grid>

            <Grid item xs={smDown ? 3 : 2}>
              {row.sorvete_id}
            </Grid>

            {!smDown && (
              <Grid item xs={smDown ? 3 : 2}>
                {row.descricao}
              </Grid>
            )}
          </Grid>
        ))}
      </Box>

      {totalCount > 0 && (
        <Box my={4}>
          <Pagination
            size="large"
            count={totalPages}
            page={page}
            onChange={(_, newPage) =>
              setSearchParams({ page: newPage.toString() }, { replace: true })
            }
          />
        </Box>
      )}
    </ListaAdm>
  )
}
