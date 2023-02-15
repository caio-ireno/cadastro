import { Button, Icon, TextField, useTheme } from '@mui/material';
import { Box } from '@mui/system';

import { Environment } from '../../environment';

interface FerramentasDaListaProps {
  textoBusca?: string;
  mostarInputBusca?: boolean;
  aoMudarTextoBusca?: (novotexto: string) => void;
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  aoClicarEmNovo?: () => void;
}

export const FerramentasDaLista: React.FC<FerramentasDaListaProps> = ({
  aoMudarTextoBusca,
  mostarInputBusca = false,
  textoBusca = '',
  aoClicarEmNovo,
  textoBotaoNovo = 'Novo',
  mostrarBotaoNovo = true,
}) => {
  const theme = useTheme();
  return (
    <Box
      height={theme.spacing(5)}
      marginX={1}
      padding={2}
      paddingX={1}
      display="flex"
      alignItems="center"
    >
      {mostarInputBusca && (
        <TextField
          value={textoBusca}
          onChange={(e) => aoMudarTextoBusca?.(e.target.value)}
          size="small"
          placeholder={Environment.INPUT_DE_BUSCA}
        />
      )}

      <Box flex={1} display="flex" justifyContent="end">
        {mostrarBotaoNovo && (
          <Button
            color="primary"
            disableElevation
            variant="contained"
            onClick={aoClicarEmNovo}
            endIcon={<Icon>add</Icon>}
          >
            {textoBotaoNovo}
          </Button>
        )}
      </Box>
    </Box>
  );
};
