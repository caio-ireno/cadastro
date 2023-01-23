import { Paper, TextField, useTheme } from '@mui/material';
import { Box } from '@mui/system';

interface BarraDeFerramentasProps {
  textoBusca?: string;
  mostarInputBusca?: boolean;
  aoMudarTextoBusca?: (novotexto: string) => void;
}

export const BarraDeFerramentas: React.FC<BarraDeFerramentasProps> = ({
  aoMudarTextoBusca,
  mostarInputBusca = false,
  textoBusca = '',
}) => {
  const theme = useTheme();
  return (
    <Box
      component={Paper}
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
    >
      {mostarInputBusca && (
        <TextField
          value={textoBusca}
          onChange={(e) => aoMudarTextoBusca?.(e.target.value)}
          size="small"
          placeholder="Pesquisar..."
        />
      )}
    </Box>
  );
};
