import { Box, CircularProgress, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useDebounce } from '../../hooks';
import {
  NoticiaProps,
  NoticiaServices,
} from '../../services/api/noticias/NoticiasService';

export const CarouselComponent = () => {
  const { debounce } = useDebounce();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  const [rows, setRows] = useState<NoticiaProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      NoticiaServices.getAll().then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          return;
        } else {
          console.log(result.data);
          setRows(result.data.slice(0, 3));
        }
      });
    });
  }, []);

  return (
    <Box>
      {isLoading && (
        <Box display="flex" alignItems={'center'} justifyContent="center">
          <CircularProgress />
        </Box>
      )}
      {!isLoading && (
        <Carousel autoPlay navButtonsAlwaysVisible indicators={false}>
          {rows.map((row) => (
            <Box
              width={'100%'}
              maxHeight={smDown ? '200px' : mdDown ? '300px' : '500px'}
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
      )}
    </Box>
  );
};
