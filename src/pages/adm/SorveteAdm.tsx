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
  Typography,
  ListItemButton,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import {
  useMatch,
  useNavigate,
  useResolvedPath,
  useSearchParams,
} from 'react-router-dom';

import { Environment } from '../../shared/environment';
import { useDebounce } from '../../shared/hooks';

import {
  AllTypes,
  SorveteProps,
} from '../../shared/services/api/sorvete/AllTypes';
import { ListaAdm } from './ListaAdm';

interface ListItemLinkProps {
  label: string;
  to: string;
}

const ListItemLink: React.FC<ListItemLinkProps> = ({ to, label }) => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);
  const pathName = resolvedPath.pathname.replace('/sorvete/', '');
  const match = useMatch({ path: pathName, end: false });

  const handleClick = () => {
    navigate(to);
  };
  return (
    <Box
      display={'flex'}
      sx={{
        ':hover': {
          backgroundColor: '#fff',
          textDecorationLine: 'underline',
          textDecorationColor: '#5DADE2',
          textDecorationThickness: '5px ',
          textDecorationSkipInk: 'none',
        },
      }}
      onClick={handleClick}
    >
      <Typography
        selected={!!match}
        component={ListItemButton}
        fontSize={mdDown ? 15 : 20}
      >
        {label}
      </Typography>
    </Box>
  );
};

export const SorveteAdm: React.FC = () => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();

  const [rows, setRows] = useState<SorveteProps[]>([]);
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
      AllTypes.getAll(pagina).then((result) => {
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
  }, [pagina]);

  console.log(rows);

  const results = [];
  const pathName = window.location.pathname.replace('/adm-page/', '');
  for (let i = 0; i < rows.length; i++) {
    if (pathName === rows[i].tipo) {
      results.push(rows[i].sabores);
    }
  }

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
        <Box
          borderBottom={'1px solid'}
          width={'100%'}
          display={'flex'}
          flexDirection="row"
          justifyContent={'center'}
          alignItems="center"
          flexWrap={'wrap'}
          mt={mdDown ? 5 : 3}
          gap={mdDown ? 1 : 3}
        >
          <ListItemLink to="/adm-page/mais-populares" label="Mais populares" />
          <ListItemLink to="/adm-page/gourmet" label="Gourmet" />
          <ListItemLink to="/adm-page/standart" label="Standart" />
          <ListItemLink to="/adm-page/especial" label="Especial" />
          <ListItemLink to="/adm-page/picole" label="Picole" />
          <ListItemLink to="/adm-page/linha-zero" label="Linha Zero" />
          <ListItemLink to="/adm-page/acai" label="Açai" />
          <ListItemLink to="/adm-page/copao" label="Copão" />
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={100}>Ação</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Imagem</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.flat().map((result) => (
              <TableRow key={result.id}>
                <TableCell>
                  <IconButton onClick={() => handleDelete(result.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{result.nome}</TableCell>
                <TableCell>{result.descricao}</TableCell>
                <TableCell>{result.imagem}</TableCell>
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
