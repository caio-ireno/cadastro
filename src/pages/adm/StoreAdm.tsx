/* eslint-disable indent */
import {
  useTheme,
  useMediaQuery,
  Grid,
  Box,
  LinearProgress,
  Pagination,
  IconButton,
  Icon,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FerramentasDaLista } from '../../shared/components';

import { Environment } from '../../shared/environment';
import { useDebounce } from '../../shared/hooks';

import {
  AllTypes,
  ListaSorveteProps,
} from '../../shared/services/api/sorvete/AllTypes';
import { ListaAdm } from './ListaAdm';

export const StoreAdm: React.FC = () => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();

  const navigate = useNavigate();

  const [rows, setRows] = useState<ListaSorveteProps[]>([]);
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
      AllTypes.getAllSabores(pagina, busca).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          return;
        } else {
          setRows(result.data);
          SetTotalCount(result.totalCount);
        }
      });
    });
  }, [busca, pagina]);

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      AllTypes.deleteById(id).then((result) => {
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
        aoMudarTextoBusca={(texto) =>
          setSearchParams({ busca: texto, pagina: '1' }, { replace: true })
        }
        mostarInputBusca
        aoClicarEmNovo={() => navigate('/adm-page/sorvetes/nova')}
      />

      <Box p={1}>
        <Grid
          display="flex"
          justifyContent={'center'}
          fontWeight={'bold'}
          container
          textAlign="center"
          fontSize={15}
          m="auto"
        >
          <Grid item xs={smDown ? 3 : 1}>
            Ação
          </Grid>
          <Grid item xs={smDown ? 3 : 2}>
            Nome
          </Grid>
          <Grid item xs={smDown ? 3 : 2}>
            Tipo
          </Grid>
          <Grid item xs={smDown ? 3 : 2}>
            Descrição
          </Grid>
        </Grid>

        {rows.map((row) => (
          <Grid
            display="flex"
            justifyContent={'center'}
            container
            textAlign={'center'}
            mt={4}
            key={row.id}
            fontSize={15}
          >
            <Grid item xs={smDown ? 3 : 1}>
              <IconButton onClick={() => handleDelete(row.id)}>
                <Icon fontSize={'small'}>delete</Icon>
              </IconButton>
              <IconButton
                onClick={() => navigate(`/adm-page/sorvetes/${row.id}`)}
              >
                <Icon fontSize={'small'}>edit</Icon>
              </IconButton>
            </Grid>
            <Grid item xs={smDown ? 3 : 2}>
              {row.nome}
            </Grid>

            <Grid item xs={smDown ? 3 : 2}>
              {row.sorveteId === 1
                ? 'Gourmet'
                : row.sorveteId === 2
                ? 'Standart'
                : row.sorveteId === 3
                ? 'Especial'
                : row.sorveteId === 4
                ? 'Açaí'
                : row.sorveteId === 5
                ? 'Copão'
                : row.sorveteId === 6
                ? 'Picolé'
                : row.sorveteId === 7
                ? 'Linha Zero'
                : 'Mais Populares'}
            </Grid>

            <Grid item xs={smDown ? 3 : 2}>
              {row.descricao}
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
