import {
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
  useTheme,
  useMediaQuery,
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

export const SorveteAdm: React.FC = () => {
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
      <TableContainer>
        <FerramentasDaLista
          textoBusca={busca}
          aoMudarTextoBusca={(texto) =>
            setSearchParams({ busca: texto, pagina: '1' }, { replace: true })
          }
          mostarInputBusca
          aoClicarEmNovo={() => navigate('/adm-page/sorvetes/nova')}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ação</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Tipo de Sorvete</TableCell>
              <TableCell>Descrição</TableCell>
              {/* <TableCell>Imagem</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell width={100}>
                  <IconButton onClick={() => handleDelete(row.id)}>
                    <Icon fontSize={'small'}>delete</Icon>
                  </IconButton>
                  <IconButton
                    onClick={() => navigate(`/adm-page/sorvetes/${row.id}`)}
                  >
                    <Icon fontSize={'small'}>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.nome}</TableCell>
                {row.sorveteId === 1 && <TableCell>gourmet</TableCell>}
                {row.sorveteId === 2 && <TableCell>standart</TableCell>}
                {row.sorveteId === 3 && <TableCell>especial</TableCell>}
                {row.sorveteId === 4 && <TableCell>açaí</TableCell>}
                {row.sorveteId === 5 && <TableCell>copão</TableCell>}
                {row.sorveteId === 6 && <TableCell>picolé</TableCell>}
                {row.sorveteId === 7 && <TableCell>linha-zero</TableCell>}
                <TableCell>{row.descricao}</TableCell>
                {/* <TableCell>{row.imagem}</TableCell> */}
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
