import {
  Button,
  ListItemButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Box } from '@mui/system'
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom'

interface ListItemLinkProps {
  label: string
  to: string
}

const ListItemLink: React.FC<ListItemLinkProps> = ({ to, label }) => {
  const theme = useTheme()
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))
  const navigate = useNavigate()

  const resolvedPath = useResolvedPath(to)
  const pathName = resolvedPath.pathname.replace('/sorvete/', '')
  const match = useMatch({ path: pathName, end: false })

  const handleClick = () => {
    navigate(to)
  }

  console.log(localStorage)
  return (
    <Box display={'flex'} onClick={handleClick}>
      <Typography
        selected={!!match}
        component={ListItemButton}
        fontSize={mdDown ? 15 : 20}
      >
        {label}
      </Typography>
    </Box>
  )
}

interface ListaAdmProps {
  children?: React.ReactNode
}

export const ListaAdm: React.FC<ListaAdmProps> = ({ children }) => {
  const theme = useTheme()
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('authToken')
    navigate('/login')
  }
  //const isAuthenticated = localStorage.getItem('authToken') !== null

  return (
    <Box>
      <Box
        width={'100%'}
        display={'flex'}
        flexDirection="row"
        justifyContent={'center'}
        alignItems="center"
        flexWrap={'wrap'}
        py={2}
        mt={mdDown ? 5 : 0}
        gap={mdDown ? 1 : 3}
      >
        <Box
          display={'flex'}
          flexWrap="wrap"
          flexDirection="row"
          justifyContent={'center'}
          alignItems="center"
        >
          <ListItemLink to="/adm-page/sorvetes" label="Sorvetes" />
          <ListItemLink to="/adm-page/noticias" label="Noticias" />
          <ListItemLink to="/adm-page/lojas" label="Lojas" />
          <ListItemLink to="/adm-page/tipo-sorvete" label="Tipo Sorvete" />
          <ListItemLink to="/adm-page/historias/1" label="Historia" />
          <ListItemLink to="/adm-page/contato/1" label="Contato" />
        </Box>
        <Button
          sx={{ backgroundColor: '#FFF', color: '#000', fontWeight: 'bold' }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>

      <Box sx={{ width: '100%' }} py={1} mt={1} pb={4}>
        {children}
      </Box>
    </Box>
  )
}
