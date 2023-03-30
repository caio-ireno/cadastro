import {
  Icon,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";

import { useDrawerContext } from "../contexts";

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
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const { toggleDrawerOpen } = useDrawerContext();
  return (
    <Box width={"100%"} display="flex" flexDirection={"column"}>
      <Box display="flex">
        {smDown && (
          <Box
            px={2}
            py={1}
            width={"100%"}
            display={"flex"}
            alignItems="center"
            justifyContent={"space-between"}
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

      {barraDeFerramentas && (
        <Box display="flex" alignItems={"center"} justifyContent="center">
          {barraDeFerramentas}
        </Box>
      )}
      <Typography>{titulo}</Typography>

      <Box p={1}>{children}</Box>
    </Box>
  );
};
