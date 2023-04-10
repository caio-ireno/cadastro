import {
  Divider,
  Icon,
  ListItemButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

import { useDebounce } from '../../hooks'
import {
  ContatoProps,
  ContatoServices,
} from '../../services/api/contato/ContatoService'

interface ListItemLinkProps {
  label: string
  to: string
}

const ListItemLink: React.FC<ListItemLinkProps> = ({ to, label }) => {
  const theme = useTheme()
  // const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(to)
  }
  return (
    <ListItemButton
      sx={{
        ':hover': {
          backgroundColor: '#fff',
        },
      }}
      onClick={handleClick}
    >
      <Typography
        sx={{
          ':hover': {
            backgroundColor: '#fff',
            textDecorationColor: '#5DADE2',
            textDecorationSkipInk: 'none',
            color: '#5DADE2',
          },
        }}
        fontSize={mdDown ? 12 : 15}
        fontWeight={'bold'}
      >
        {label}
      </Typography>
    </ListItemButton>
  )
}

export const Footer: React.FC = () => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

  const { debounce } = useDebounce()
  const [rows, setRows] = useState<ContatoProps[]>([])

  useEffect(() => {
    debounce(() => {
      ContatoServices.getAll().then(result => {
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
    <Box>
      <Box
        mr={smDown ? 5 : 10}
        ml={smDown ? 5 : 10}
        display={'flex'}
        justifyContent="space-between"
        my={2}
        p={1}
      >
        {!smDown && (
          <Box display="flex" alignItems={'start'}>
            <Box
              sx={{
                height: mdDown ? theme.spacing(6) : theme.spacing(10),
                width: mdDown ? theme.spacing(10) : theme.spacing(15),
              }}
              component="img"
              src="https://static.goomer.app/stores/63568/products/mobile_menu/templates/91794/logo_v1600432939.png"
            />
          </Box>
        )}

        <Box
          flexDirection={'column'}
          display={'flex'}
          alignItems="start"
          justifyContent={'center'}
          width={'300px'}
        >
          <Typography
            color="#3498DB"
            fontWeight={'bold'}
            fontSize={mdDown ? 20 : 30}
            px={'16px'}
          >
            Informações
          </Typography>
          <ListItemLink to="/pagna-inicial" label="Pagina inicial" />
          <ListItemLink to="/sorvetes" label="Sorvetes" />
          <ListItemLink to="/lojas" label="Lojas" />
          <ListItemLink to="/historia" label="História" />
        </Box>

        {rows.map(row => (
          <Box key={row.id} display="flex" flexDirection="column" gap={2}>
            <Box>
              <Typography
                color="#3498DB"
                fontWeight={'bold'}
                fontSize={mdDown ? 20 : 30}
              >
                Fale conosco
              </Typography>
              <Typography
                fontSize={mdDown ? 15 : 20}
                marginLeft={mdDown ? '0px' : '25px'}
                color="#717D7E"
              >
                Se quiser bater um papo, ligue
              </Typography>
            </Box>

            <Box>
              <Box gap={2} display="flex" alignItems={'center'} mt={2}>
                {!mdDown && <Icon>phone</Icon>}
                <a
                  href={`tel:${row.celular}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Typography fontSize={mdDown ? 15 : 20}>
                    {row.celular}
                  </Typography>
                </a>
              </Box>
              <Box gap={2} display="flex" alignItems={'center'} mt={1}>
                {!mdDown && <Icon>mail</Icon>}
                <a
                  href={`mailto:${row.email}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Typography fontSize={mdDown ? 15 : 20}>
                    {row.email}
                  </Typography>
                </a>
              </Box>
            </Box>

            <Divider />
            <Box display={'flex'} flexDirection="row" gap={2}>
              <Link to={row.facebook}>
                <FaFacebook size={40} color="#5DADE2" />
              </Link>
              <Link to={row.instagram}>
                <FaInstagram size={40} color="#5DADE2" />
              </Link>
            </Box>
          </Box>
        ))}
      </Box>
      <Box width={'100%'} height={'100px'} display="flex" alignItems={'center'}>
        <Typography
          fontSize={mdDown ? 10 : 15}
          mx={mdDown ? 2 : 3}
          my={2}
          p={1}
        >
          Urla © Alguns direitos reservados.
        </Typography>
      </Box>
    </Box>
  )
}
