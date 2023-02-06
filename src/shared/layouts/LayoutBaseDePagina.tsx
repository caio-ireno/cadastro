import {
  Icon,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import { useDrawerContext } from '../contexts';
import { DarkTheme } from '../theme';

interface LayoutBaseDePaginaProps {
  titulo?: string;
  barraDeFerramentas?: React.ReactNode;
  children: React.ReactNode;
}

//Layout que fica dentro da pagina que queremos que tenha esse design
export const LayoutBaseDePagina: React.FC<LayoutBaseDePaginaProps> = ({
  children,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { toggleDrawerOpen } = useDrawerContext();
  return (
    <Box height="100%" display="flex" flexDirection={'column'}>
      <Box display="flex" alignItems={'center'}>
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}
      </Box>

      <Box>{children}</Box>
    </Box>
  );
};
