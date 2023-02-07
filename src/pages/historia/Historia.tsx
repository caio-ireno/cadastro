import { Box, useTheme, useMediaQuery, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '../../shared/hooks';

import { LayoutBaseDePagina } from '../../shared/layouts';
import {
  HistoriaProps,
  HistoriaService,
} from '../../shared/services/api/historia/HistoriaService';

export const Historia: React.FC = () => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();

  const [rows, setRows] = useState<HistoriaProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      HistoriaService.getAll(busca).then((result) => {
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
          src="https://scontent.fsod2-1.fna.fbcdn.net/v/t31.18172-8/19956951_795657103925733_8372376656500984706_o.jpg?_nc_cat=110&ccb=1-7&_nc_sid=e3f864&_nc_ohc=wjFxXYh-lWkAX-hEcBP&tn=O3EcyzBfwA2FUv1M&_nc_ht=scontent.fsod2-1.fna&oh=00_AfDYyoXVRBZB7lnwPN1JhizZOpV-TrpqIIp80JReddnZ1g&oe=640A25E0"
        />
      </Box>
      {rows.map((row) => (
        <Box key={row.id}>
          <Typography>{row.p1}</Typography>
          <Typography>{row.p2}</Typography>
          <Typography>{row.p1}</Typography>
        </Box>
      ))}
    </LayoutBaseDePagina>
  );
};
