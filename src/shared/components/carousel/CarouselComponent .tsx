import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '../../hooks';
import {
  NoticiaProps,
  NoticiaServices,
} from '../../services/api/noticias/NoticiasService';

export const CarouselComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  const [rows, setRows] = useState<NoticiaProps[]>([]);
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
      NoticiaServices.getAll(busca).then((result) => {
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
  }, [busca, pagina]);
  return (
    <Box>
      <Carousel autoPlay navButtonsAlwaysVisible>
        {rows.map((row) => (
          <Box
            width={'100%'}
            maxHeight={smDown ? '200px' : mdDown ? '300px' : '700px'}
            display="flex"
            justifyContent={'center'}
            key={row.id}
          >
            <Box
              width={'100%'}
              height="auto"
              component="img"
              src={row.imgNoticia}
            />
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};
