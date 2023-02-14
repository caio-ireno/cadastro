import { Icon, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { Footer } from '../components/footer/Footer';
import { useDrawerContext } from '../contexts';

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
    <Box width={'100%'} height="100%" display="flex" flexDirection={'column'}>
      <Box display="flex">
        {smDown && (
          <Box
            px={2}
            py={1}
            width={'100%'}
            display={'flex'}
            alignItems="center"
            justifyContent={'space-between'}
          >
            <IconButton onClick={toggleDrawerOpen}>
              <Icon>menu</Icon>
            </IconButton>
            <Box
              sx={{
                height: theme.spacing(6),
                width: theme.spacing(10),
              }}
              component="img"
              src="https://static.goomer.app/stores/63568/products/mobile_menu/templates/91794/logo_v1600432939.png"
            />
          </Box>
        )}
      </Box>

      <Box p={1}>{children}</Box>

      <Footer />
    </Box>
  );
};
