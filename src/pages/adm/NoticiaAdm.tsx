import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  LinearProgress,
  Pagination,
  IconButton,
  Icon,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FerramentasDaLista } from '../../shared/components';

import { Environment } from '../../shared/environment';
import { useDebounce } from '../../shared/hooks';

import {
  NoticiaProps,
  NoticiaServices,
} from '../../shared/services/api/noticias/NoticiasService';
import { ListaAdm } from './ListaAdm';

export const NoticiaAdm: React.FC = () => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const navigate = useNavigate();

  const [rows, setRows] = useState<NoticiaProps[]>([]);
  const [totalCount, SetTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get('pagina') || '1');
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      NoticiaServices.getAll(pagina, busca).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          return;
        } else {
          console.log(result);

          setRows(result.data);
          SetTotalCount(result.totalCount);
        }
      });
    });
  }, [busca, pagina]);

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      NoticiaServices.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setRows((oldRows) => {
            return [...oldRows.filter((oldRow) => oldRow.id !== id)];
          });
          alert('Registro Apagado com sucesso');
        }
      });
    }
  };

  return (
    <ListaAdm>
      <FerramentasDaLista
        textoBusca={busca}
        textoBotaoNovo="nova"
        aoClicarEmNovo={() => navigate('/adm-page/noticias/nova')}
      />
      <Box p={1}>
        <Grid
          display="flex"
          fontWeight={'bold'}
          container
          textAlign="center"
          fontSize={15}
          m="auto"
          justifyContent={'center'}
        >
          <Grid item xs={smDown ? 4 : 1}>
            Ação
          </Grid>
          <Grid item xs={smDown ? 4 : 2}>
            Nome
          </Grid>
        </Grid>

        {rows.map((row) => (
          <Grid
            container
            textAlign={'center'}
            mt={4}
            key={row.id}
            fontSize={15}
            display="flex"
            justifyContent={'center'}
          >
            <Grid item xs={smDown ? 3 : 1}>
              <IconButton onClick={() => handleDelete(row.id)}>
                <Icon fontSize={'small'}>delete</Icon>
              </IconButton>
              <IconButton
                onClick={() => navigate(`/adm-page/noticias/${row.id}`)}
              >
                <Icon fontSize={'small'}>edit</Icon>
              </IconButton>
            </Grid>
            <Grid item xs={smDown ? 4 : 2}>
              {row.nomeNoticia}
            </Grid>
          </Grid>
        ))}
      </Box>

      {totalCount === 0 && !isLoading && (
        <caption>{Environment.LISTAGEM_VAZIA}</caption>
      )}

      {isLoading && (
        <Box my={4}>
          <LinearProgress variant="indeterminate"></LinearProgress>
        </Box>
      )}
      {totalCount > 0 && totalCount > Environment.LIMITE_LINHAS && (
        <Box my={4}>
          <Pagination
            count={Math.ceil(totalCount / Environment.LIMITE_LINHAS)}
            page={pagina}
            onChange={(_, newPage) =>
              setSearchParams(
                { busca, pagina: newPage.toString() },
                { replace: true },
              )
            }
          />
        </Box>
      )}
    </ListaAdm>
  );
};
