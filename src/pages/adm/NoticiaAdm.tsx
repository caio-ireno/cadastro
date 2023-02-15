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
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FerramentasDaLista } from '../../shared/components';

import { Environment } from '../../shared/environment';
import { useDebounce } from '../../shared/hooks';

import {
  NoticiaProps,
  NoticiaServices,
} from '../../shared/services/api/noticias/NoticiasService';
import { ListaAdm } from './ListaAdm';

export const NoticiaAdm: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();

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
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ m: 1, width: 'auto' }}
      >
        <FerramentasDaLista textoBusca={busca} textoBotaoNovo="nova" />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={100}>Ação</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Imagem</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton onClick={() => handleDelete(row.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.nomeNoticia}</TableCell>
                <TableCell>{row.imgNoticia}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          {totalCount === 0 && !isLoading && (
            <caption>{Environment.LISTAGEM_VAZIA}</caption>
          )}
          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant="indeterminate"></LinearProgress>
                </TableCell>
              </TableRow>
            )}
            {totalCount > 0 && totalCount > Environment.LIMITE_LINHAS && (
              <TableRow>
                <TableCell colSpan={3}>
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
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </ListaAdm>
  );
};
