import {
  Button,
  Icon,
  LinearProgress,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { FerramentasDaLista } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';
import { LayoutBaseDePagina } from '../../shared/layouts';
import {
  LojasProps,
  LojasServices,
} from '../../shared/services/api/lojas/LojasService';

export const ListaLojas: React.FC = () => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();

  const [rows, setRows] = useState<LojasProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      LojasServices.getAll(busca).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          return;
        } else {
          console.log(result);

          setRows(result.data);
        }
      });
    });
  }, [busca]);

  return (
    <LayoutBaseDePagina
      titulo="Lojas"
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
      {isLoading && <LinearProgress variant="indeterminate"></LinearProgress>}
      {!isLoading && (
        <Box padding={1}>
          {rows.map((row) => (
            <Box
              display="flex"
              component={Paper}
              marginBottom={3}
              key={row.id}
              gap={3}
            >
              <Box
                display={smDown ? 'none' : ''}
                width={smDown ? '200px' : mdDown ? '200px' : '300px'}
                component="img"
                src={row.imgLoja}
              />
              <Box
                padding={1}
                gap={1}
                display={'flex'}
                flexWrap="wrap"
                flexDirection="column"
                alignItems={'start'}
                justifyContent="center"
              >
                <Typography variant={smDown ? 'h6' : mdDown ? 'h5' : 'h4'}>
                  {row.nomeLoja}
                </Typography>
                <Typography variant={'body1'} display="flex" flexWrap="wrap">
                  {row.endereço}
                </Typography>
                <Box
                  display="flex"
                  alignItems={'center'}
                  justifyContent="center"
                >
                  <Icon>phone</Icon>
                  <Typography>{row.telefone}</Typography>
                </Box>
                <Button
                  sx={{ width: '100%' }}
                  variant="contained"
                  href={row.rota}
                >
                  Rota
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </LayoutBaseDePagina>
  );
};
