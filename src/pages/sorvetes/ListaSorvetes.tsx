import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { FerramentasDaLista } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';
import { LayoutBaseDePagina } from '../../shared/layouts';
import {
  SorveteProps,
  SorveteService,
} from '../../shared/services/api/sorvete/SorveteService';

export const ListaSorvetes: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();

  const [rows, setRows] = useState<SorveteProps[]>([]);
  const [totalCount, SetTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      SorveteService.getAll(1, busca).then((result) => {
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
  }, [busca]);

  return (
    <LayoutBaseDePagina
      titulo="Lista Sorvetes"
      barraDeFerramentas={
        <FerramentasDaLista
          mostarInputBusca
          textoBusca={busca}
          aoMudarTextoBusca={(texto) =>
            setSearchParams({ busca: texto }, { replace: true })
          }
        />
      }
    >
      {isLoading && (
        <Box
          margin={5}
          display={'flex'}
          alignItems="center"
          justifyContent={'center'}
        >
          <Typography> Carregando...</Typography>
        </Box>
      )}
      {!isLoading && (
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{ m: 1, width: 'auto' }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Preço</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.nomeSorvete}</TableCell>
                  <TableCell>{row.tipoSorvete}</TableCell>
                  <TableCell>R$ {row.preço}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </LayoutBaseDePagina>
  );
};
