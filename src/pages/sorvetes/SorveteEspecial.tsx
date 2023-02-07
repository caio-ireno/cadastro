import { Typography, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useMatch, useResolvedPath } from 'react-router-dom';
import { useDebounce } from '../../shared/hooks';

import {
  SorveteProps,
  SorveteServiceEspecial,
} from '../../shared/services/api/sorvete/SorveteServiceEspecial';
import { ListaSorvetes } from './ListaSorvetes';

export const SorveteEspecial: React.FC = () => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();

  const [rows, setRows] = useState<SorveteProps[]>([]);

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get('pagina') || '1');
  }, [searchParams]);

  useEffect(() => {
    debounce(() => {
      SorveteServiceEspecial.getAll(pagina, busca).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
          return;
        } else {
          //console.log(result.data);

          setRows(result.data);
        }
      });
    });
  }, [busca, pagina]);

  return (
    <ListaSorvetes>
      <Box
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
            p={1}
            width={'500px'}
            height="100px"
            justifyContent={'space-between'}
            key={row.id}
            display="flex"
            flexDirection={'row'}
            border="1px solid"
          >
            <Box>
              <Typography fontWeight={'bold'} fontSize={smDown ? 15 : 25}>
                {row.nomeSorvete}
              </Typography>
              <Typography fontSize={smDown ? 12 : 20}>
                {row.descrição}
              </Typography>
            </Box>

            <Box display="flex" alignItems={'center'} justifyContent="center">
              <Box
                sx={{
                  height: '100%',
                  width: smDown ? theme.spacing(15) : theme.spacing(20),
                }}
                component="img"
                src={row.img}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </ListaSorvetes>
  );
};
