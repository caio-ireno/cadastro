/* eslint-disable indent */
import {
  Button,
  Divider,
  Icon,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface FerramentasDeDetalheProps {
  TextoBotaoNovo?: string;

  mostarBotaoVoltarCarregando?: boolean;
  mostarBotaoNovoCarregando?: boolean;
  mostarBotaoApagarCarregando?: boolean;
  mostarBotaoSalvarCarregando?: boolean;
  mostarBotaoSalvarEFecharCarregando?: boolean;

  mostarBotaoNovo?: boolean;
  mostarBotaoVoltar?: boolean;
  mostarBotaoApagar?: boolean;
  mostarBotaoSalvar?: boolean;
  mostarBotaoSalvarEFechar?: boolean;

  aoClicarEmNovo?: () => void;
  aoClicarEmVoltar?: () => void;
  aoClicarEmSalvar?: () => void;
  aoClicarEmApagar?: () => void;
  aoClicarEmSalvrEFechar?: () => void;
}

const FerramentasDeDetalhe: React.FC<FerramentasDeDetalheProps> = ({
  TextoBotaoNovo = "novo",

  mostarBotaoVoltar = true,
  mostarBotaoNovo = true,
  mostarBotaoApagar = true,
  mostarBotaoSalvar = true,
  mostarBotaoSalvarEFechar = false,

  mostarBotaoVoltarCarregando = false,
  mostarBotaoNovoCarregando = false,
  mostarBotaoApagarCarregando = false,
  mostarBotaoSalvarCarregando = false,
  mostarBotaoSalvarEFecharCarregando = false,

  aoClicarEmNovo,
  aoClicarEmVoltar,
  aoClicarEmSalvar,
  aoClicarEmApagar,
  aoClicarEmSalvrEFechar,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      gap={2}
      display="flex"
      alignItems="center"
      mt={3}
    >
      {mostarBotaoSalvar && !mostarBotaoSalvarCarregando && (
        <Button
          onClick={aoClicarEmSalvar}
          color="primary"
          disableElevation
          variant="contained"
          startIcon={<Icon>save</Icon>}
        >
          {!smDown && (
            <Typography
              variant="button"
              whiteSpace={"nowrap"}
              textOverflow="ellipsis"
              overflow={"hidden"}
            >
              Salvar
            </Typography>
          )}
        </Button>
      )}

      {mostarBotaoSalvarCarregando && <Skeleton width={110} height={60} />}

      {mostarBotaoSalvarEFechar &&
        !mostarBotaoSalvarEFecharCarregando &&
        !mdDown && (
          <Button
            onClick={aoClicarEmSalvrEFechar}
            color="primary"
            disableElevation
            variant="outlined"
            startIcon={<Icon>save</Icon>}
          >
            <Typography
              variant="button"
              whiteSpace={"nowrap"}
              textOverflow="ellipsis"
              overflow={"hidden"}
            >
              salvar e fechar
            </Typography>
          </Button>
        )}

      {mostarBotaoSalvarEFecharCarregando && !mdDown && (
        <Skeleton width={180} height={60} />
      )}

      {mostarBotaoApagar && !mostarBotaoApagarCarregando && (
        <Button
          onClick={aoClicarEmApagar}
          color="primary"
          disableElevation
          variant="outlined"
          startIcon={<Icon>delete</Icon>}
        >
          {!smDown && (
            <Typography
              variant="button"
              whiteSpace={"nowrap"}
              textOverflow="ellipsis"
              overflow={"hidden"}
            >
              apagar
            </Typography>
          )}
        </Button>
      )}

      {mostarBotaoApagarCarregando && <Skeleton width={110} height={60} />}

      {mostarBotaoNovo && !mostarBotaoNovoCarregando && (
        <Button
          onClick={aoClicarEmNovo}
          color="primary"
          disableElevation
          variant="outlined"
          startIcon={<Icon>add</Icon>}
        >
          {!smDown && (
            <Typography
              variant="button"
              whiteSpace={"nowrap"}
              textOverflow="ellipsis"
              overflow={"hidden"}
            >
              {TextoBotaoNovo}
            </Typography>
          )}
        </Button>
      )}
      {mostarBotaoNovoCarregando && <Skeleton width={110} height={60} />}

      <Divider variant="middle" orientation="vertical" />
      {mostarBotaoVoltar && !mostarBotaoVoltarCarregando && (
        <Button
          onClick={aoClicarEmVoltar}
          color="primary"
          disableElevation
          variant="outlined"
          startIcon={<Icon>arrow_back</Icon>}
        >
          {!smDown && (
            <Typography
              variant="button"
              whiteSpace={"nowrap"}
              textOverflow="ellipsis"
              overflow={"hidden"}
            >
              Voltar
            </Typography>
          )}
        </Button>
      )}
      {mostarBotaoVoltarCarregando && <Skeleton width={110} height={60} />}
    </Box>
  );
};

export default FerramentasDeDetalhe;
