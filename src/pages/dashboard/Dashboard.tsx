import { LayoutBaseDePagina } from '../../shared/layouts';
import React, { useEffect, useMemo, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import {
  ImageList,
  ImageListItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import { useSearchParams } from 'react-router-dom';
import {
  NoticiaProps,
  NoticiaServices,
} from '../../shared/services/api/noticias/NoticiasService';
import { useDebounce } from '../../shared/hooks';
import { ProdutosHome } from '../../shared/components/Produtos-home/ProdutosHome';

export const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

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
      NoticiaServices.getAll(busca).then((result) => {
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
  return (
    <LayoutBaseDePagina>
      <Box p="50px">
        <Carousel autoPlay navButtonsAlwaysVisible>
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
      </Box>

      <Box
        display={'flex'}
        alignItems="center"
        justifyContent={'center'}
        flexDirection="row"
        width={'100%'}
      >
        <ProdutosHome
          icon="https://static.thenounproject.com/png/2463767-200.png"
          nameProduto="Açai"
          labelProduto="É uma explosão de sabor e energia a qualquer momento do dia. Que tal uma dose de energia hoje?"
          imgProduto="https://scontent.fsod2-1.fna.fbcdn.net/v/t1.6435-9/196852938_1855868837904549_5075483553856899655_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=a26aad&_nc_ohc=6C51Gl5SidcAX8jTc9z&_nc_ht=scontent.fsod2-1.fna&oh=00_AfCpx_0hwBnwa-dcGZl3jQJc_f3LBcAUS_Mrl2U15xWiDA&oe=6408B550"
        />
        <ProdutosHome
          icon="https://cdn-icons-png.flaticon.com/512/3132/3132683.png"
          nameProduto="Picole Zero"
          labelProduto="É uma explosão de sabor e energia a qualquer momento do dia. Que tal uma dose de energia hoje?É uma explosão de sabor e "
          imgProduto="https://scontent.fsod2-1.fna.fbcdn.net/v/t39.30808-6/278429794_2095251060632991_5493227440282220637_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a26aad&_nc_ohc=mP05_dQKTnkAX_rdKVC&_nc_ht=scontent.fsod2-1.fna&oh=00_AfCq1XJ1ix2M8fyiWWZt2MZtBnwVjSqmcUjfIDclGiVJrg&oe=63E6F3D3"
        />
        <ProdutosHome
          icon="https://static.thenounproject.com/png/2463767-200.png"
          nameProduto="Sorvetes Urla"
          labelProduto="É uma explosão de sabor e energia a qualquer momento do dia. Que tal uma dose de energia hoje?"
          imgProduto="https://scontent.fsod2-1.fna.fbcdn.net/v/t39.30808-6/258196123_1982082368616528_6409125424524440553_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a26aad&_nc_ohc=Z2_lNXlkwLIAX_8SWfi&_nc_ht=scontent.fsod2-1.fna&oh=00_AfAcc86xy7bm1J0Tv7G4arPoAQvQnuDk8Idjy3SkBHQP4w&oe=63E6884F"
        />
      </Box>
    </LayoutBaseDePagina>
  );
};
