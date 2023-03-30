import {
  Box,
  CircularProgress,
  ListItemButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom'

import { useDebounce } from '../../shared/hooks'
import { LayoutBaseDePagina } from '../../shared/layouts'
import {
  AllTypes,
  SorveteProps,
} from '../../shared/services/api/sorvete/AllTypes'

interface ListItemLinkProps {
  label: string
  to: string
}

const ListItemLink: React.FC<ListItemLinkProps> = ({ to, label }) => {
  const theme = useTheme()
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const navigate = useNavigate()

  const resolvedPath = useResolvedPath(to)
  const pathName = resolvedPath.pathname.replace('/sorvete/', '')
  const match = useMatch({ path: pathName, end: false })

  const handleClick = () => {
    navigate(to)
  }
  return (
    <Box
      display={'flex'}
      sx={{
        ':hover': {
          backgroundColor: '#fff',
          textDecorationLine: 'underline',
          textDecorationColor: '#5DADE2',
          textDecorationThickness: '5px ',
          textDecorationSkipInk: 'none',
        },
      }}
      onClick={handleClick}
    >
      <Typography
        selected={!!match}
        component={ListItemButton}
        fontSize={smDown ? 12 : mdDown ? 15 : 20}
        fontWeight={'bold'}
      >
        {label}
      </Typography>
    </Box>
  )
}

interface ListaSorvetelProps {
  children?: React.ReactNode
}
export const ListaSorvetes: React.FC<ListaSorvetelProps> = () => {
  const { debounce } = useDebounce()
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))
  const [rows, setRows] = useState<SorveteProps[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    debounce(() => {
      AllTypes.getAll().then(result => {
        setIsLoading(false)
        if (result instanceof Error) {
          alert(result.message)
          return
        } else {
          setRows(result.data)
        }
      })
    })
  }, [])

  const results = []
  const pathName = window.location.pathname.replace('/sorvetes/', '')
  console.log(pathName)
  for (let i = 0; i < rows.length; i++) {
    if (pathName === rows[i].tipo) {
      console.log(rows[i])
      results.push(rows[i].sabores)
    }
  }

  return (
    <LayoutBaseDePagina>
      <Box>
        <Box
          width={'100%'}
          height="250px"
          sx={{
            objectFit: 'cover',
          }}
          component="img"
          src="https://images.unsplash.com/photo-1629385744299-74b9cf013f52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        />
      </Box>

      <Box
        borderBottom={'1px solid'}
        width={'100%'}
        display={'flex'}
        flexDirection="row"
        justifyContent={'center'}
        alignItems="center"
        flexWrap={'wrap'}
        mt={mdDown ? 5 : 10}
        gap={mdDown ? 1 : 3}
      >
        {rows.map(row => (
          <Box key={row.id}>
            <ListItemLink to={`/sorvetes/${row.tipo}`} label={row.tipo} />
          </Box>
        ))}
      </Box>
      {isLoading && (
        <Box
          p={10}
          display="flex"
          alignItems={'center'}
          justifyContent="center"
        >
          <CircularProgress />
        </Box>
      )}
      {!isLoading && (
        <Box
          sx={{
            backgroundColor: '#F2F4F4 ',
          }}
          pt={10}
          pb={10}
          display={'flex'}
          flexWrap={'wrap'}
          alignItems="center"
          justifyContent={'center'}
          flexDirection="row"
          gap={5}
        >
          {results.flat().map(result => (
            <Box
              p={1}
              width={'500px'}
              height={smDown ? 'auto' : 'auto'}
              justifyContent={'space-between'}
              key={result.id}
              display="flex"
              flexDirection={'row'}
              border="1px solid"
            >
              <Box>
                <Typography
                  fontWeight={'bold'}
                  fontSize={smDown ? 15 : mdDown ? 20 : 25}
                >
                  {result.nome}
                </Typography>
                <Typography fontSize={smDown ? 12 : mdDown ? 15 : 20}>
                  {result.descricao}
                </Typography>
              </Box>
              <Box display="flex" alignItems={'center'} justifyContent="center">
                <Box
                  sx={{
                    height: smDown ? '100px' : '200px',
                    width: smDown ? theme.spacing(15) : theme.spacing(24),
                  }}
                  component="img"
                  src={result.imagem}
                />
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </LayoutBaseDePagina>
  )
}
