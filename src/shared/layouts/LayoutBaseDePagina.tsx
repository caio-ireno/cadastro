import {
  Icon,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import { useDrawerContext } from '../contexts';

interface LayoutBaseDePaginaProps {
  titulo?: string;
  barraDeFerramentas?: React.ReactNode;
  children: React.ReactNode;
}

//Layout que fica dentro da pagina que queremos que tenha esse design
export const LayoutBaseDePagina: React.FC<LayoutBaseDePaginaProps> = ({
  children,
  barraDeFerramentas,
  titulo,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const { toggleDrawerOpen } = useDrawerContext();
  return (
    <Box height="100%" display="flex" flexDirection={'column'} gap="1">
      <Box
        padding={1}
        height={theme.spacing(smDown ? 4 : mdDown ? 8 : 12)}
        display="flex"
        alignItems={'center'}
        gap={1}
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}

        <Typography
          variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}
          whiteSpace={'nowrap'}
          overflow="hidden"
          textOverflow={'ellipsis'}
        >
          {titulo}
        </Typography>
      </Box>
      {barraDeFerramentas && <Box>{barraDeFerramentas}</Box>}
      <Box flex={1} overflow="auto">
        {children}
      </Box>
    </Box>
  );
};
