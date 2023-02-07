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
    <LayoutBaseDePagina>
      <Box>
        <Box
          width={'100%'}
          height="250px"
          sx={{
            objectFit: 'cover',
          }}
          component="img"
          src="https://scontent.fsod2-1.fna.fbcdn.net/v/t1.6435-9/51545035_1146664905491616_6910668749393625088_n.png?_nc_cat=105&ccb=1-7&_nc_sid=730e14&_nc_ohc=2YqfDYEx0CsAX_WV8DL&_nc_ht=scontent.fsod2-1.fna&oh=00_AfCJKJ5KLvvtZGt9Q9Wcv9AN0BxYZCm-iPTfoZ00fKlq_g&oe=640A58C8"
        />
      </Box>
      {isLoading && <LinearProgress variant="indeterminate"></LinearProgress>}

      <Box
        padding={1}
        mt={5}
        sx={{
          backgroundColor: '#F2F4F4 ',
        }}
        pt={10}
        pb={10}
        display={'flex'}
        flexWrap={'wrap'}
        alignItems="center"
        justifyContent={'center'}
        flexDirection="row"
        gap={5}
      >
        {rows.map((row) => (
          <Box
            display="flex"
            justifyContent={'center'}
            alignItems="center"
            marginBottom={10}
            key={row.id}
            gap={2}
            border="1px solid"
            p={1}
          >
            <Box
              borderRadius={'5px'}
              display={smDown ? 'none' : ''}
              width={smDown ? '200px' : mdDown ? '180px' : '300px'}
              height={smDown ? '200px' : mdDown ? '180px' : '200px'}
              component="img"
              sx={{
                objectFit: 'cover',
              }}
              src={row.imgLoja}
            />

            <Box
              padding={1}
              gap={1}
              display={'flex'}
              flexWrap="wrap"
              flexDirection="column"
              alignItems={'start'}
              justifyContent="space-between"
            >
              <Box
                display={'flex'}
                alignItems="start"
                flexDirection={'column'}
                gap={smDown ? 1 : mdDown ? 2 : 4}
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
    </LayoutBaseDePagina>
  );
};
