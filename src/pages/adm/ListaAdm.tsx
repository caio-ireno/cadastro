import {
  Typography,
  useMediaQuery,
  useTheme,
  ListItemButton,
} from '@mui/material';
import { Box } from '@mui/system';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { LayoutBaseDePagina } from '../../shared/layouts';

interface ListItemLinkProps {
  label: string;
  to: string;
}

const ListItemLink: React.FC<ListItemLinkProps> = ({ to, label }) => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);
  const pathName = resolvedPath.pathname.replace('/sorvete/', '');
  const match = useMatch({ path: pathName, end: false });

  const handleClick = () => {
    navigate(to);
  };
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
  );
};

interface ListaAdmProps {
  children?: React.ReactNode;
}

export const ListaAdm: React.FC<ListaAdmProps> = ({ children }) => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <LayoutBaseDePagina>
      <Box
        sx={{
          backgroundColor: '#F2F4F4 ',
        }}
        border={'1px solid'}
        width={'100%'}
        display={'flex'}
        flexDirection="column"
        justifyContent={'center'}
        alignItems="center"
        flexWrap={'wrap'}
        py={2}
        mt={mdDown ? 5 : 0}
        gap={mdDown ? 1 : 3}
      >
        <Typography fontSize={smDown ? 12 : mdDown ? 15 : 30}>
          Painel de controle Administrativo
        </Typography>
        <Box
          display={'flex'}
          flexDirection="row"
          justifyContent={'center'}
          alignItems="center"
        >
          <ListItemLink to="/adm-page/sorvetes" label="Sorvetes" />
          <ListItemLink to="/adm-page/noticias" label="Noticias" />
          <ListItemLink to="/adm-page/lojas" label="Lojas" />
        </Box>
      </Box>

      <Box sx={{ width: '100%' }}>{children}</Box>
    </LayoutBaseDePagina>
  );
};
