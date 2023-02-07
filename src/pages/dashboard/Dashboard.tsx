import { LayoutBaseDePagina } from '../../shared/layouts';
import {
  ImageList,
  ImageListItem,
  ListItemButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';

import { ProdutosHome } from '../../shared/components/Produtos-home/ProdutosHome';
import { CarouselComponent } from '../../shared/components/carousel/CarouselComponent ';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';

interface ListItemLinkProps {
  label: string;
  to: string;
}

const ListItemLink: React.FC<ListItemLinkProps> = ({ to, label }) => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const resolvePath = useResolvedPath(to);
  const match = useMatch({ path: resolvePath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
  };
  return (
    <ListItemButton
      sx={{
        ':hover': {
          backgroundColor: '#AED6F1',
          borderRadius: '10px',
        },
        borderRadius: '10px',
        border: '2px solid',
      }}
      selected={!!match}
      onClick={handleClick}
    >
      <Typography fontSize={mdDown ? 15 : 25}>{label}</Typography>
    </ListItemButton>
  );
};

export const Dashboard = () => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <LayoutBaseDePagina>
      <CarouselComponent />
      <Box
        display={'flex'}
        alignItems="center"
        justifyContent={'center'}
        flexDirection={smDown ? 'column' : 'row'}
        width={'100%'}
      >
        <ProdutosHome
          icon="https://static.thenounproject.com/png/2463767-200.png"
          nameProduto="Açai"
          labelProduto="É uma explosão de sabor e energia a qualquer momento do dia. Que tal uma dose de energia hoje?"
          imgProduto="https://scontent.fsod2-1.fna.fbcdn.net/v/t1.6435-9/196852938_1855868837904549_5075483553856899655_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=a26aad&_nc_ohc=6C51Gl5SidcAX8jTc9z&_nc_ht=scontent.fsod2-1.fna&oh=00_AfCpx_0hwBnwa-dcGZl3jQJc_f3LBcAUS_Mrl2U15xWiDA&oe=6408B550"
          to="/sorvetes/acai"
        />
        <ProdutosHome
          icon="https://cdn-icons-png.flaticon.com/512/3132/3132683.png"
          nameProduto="Picole Zero"
          labelProduto="É uma explosão de sabor e energia a qualquer momento do dia. Que tal uma dose de energia hoje? "
          imgProduto="https://scontent.fsod2-1.fna.fbcdn.net/v/t39.30808-6/278429794_2095251060632991_5493227440282220637_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a26aad&_nc_ohc=mP05_dQKTnkAX_rdKVC&_nc_ht=scontent.fsod2-1.fna&oh=00_AfCq1XJ1ix2M8fyiWWZt2MZtBnwVjSqmcUjfIDclGiVJrg&oe=63E6F3D3"
          to="/sorvetes/linha-zero"
        />
        <ProdutosHome
          icon="https://static.thenounproject.com/png/2463767-200.png"
          nameProduto="Sorvetes Urla"
          labelProduto="É uma explosão de sabor e energia a qualquer momento do dia. Que tal uma dose de energia hoje?"
          imgProduto="https://scontent.fsod2-1.fna.fbcdn.net/v/t39.30808-6/258196123_1982082368616528_6409125424524440553_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a26aad&_nc_ohc=Z2_lNXlkwLIAX_8SWfi&_nc_ht=scontent.fsod2-1.fna&oh=00_AfAcc86xy7bm1J0Tv7G4arPoAQvQnuDk8Idjy3SkBHQP4w&oe=63E6884F"
          to="/sorvetes/mais-populares"
        />
      </Box>

      <Box
        display="flex"
        flexDirection={mdDown ? 'column' : 'row'}
        gap={4}
        mt={5}
      >
        <Box
          display={'flex'}
          flexDirection="column"
          alignItems={'center'}
          justifyContent="center"
          gap={5}
        >
          <Typography
            textAlign={'center'}
            fontWeight={'bold'}
            fontSize={smDown ? 20 : mdDown ? 40 : 50}
          >
            Conheça Nossa História...
          </Typography>
          <Typography
            textAlign={'center'}
            fontSize={smDown ? 10 : mdDown ? 20 : 25}
          >
            Também no ramo há 22 anos por influência da família do marido, a
            empresária Sônia Cristina Nogueira Ferraz, uma das proprietárias da
            sorveteria Urla Urla (o marido e o cunhado compõem a sociedade),
            entrou para a modalidade do atacadão há três anos, com a primeira
            loja desse segmento aberta na avenida Otávio Augusto Rangel, 960. E
            a iniciativa deu tão certo que, além da fábrica, com sede em
            Votorantim, no Parque Jataí, o grupo familiar inaugurou três
            franquias em Sorocaba, no Jardim Vera Cruz, no Jardim Aeroporto, e
            no Éden.
          </Typography>
          <Box>
            <ListItemLink to="/historia" label="Saiba Mais" />
          </Box>
        </Box>

        {!smDown && (
          <Box>
            <ImageList
              sx={{ width: mdDown ? '100%' : 500, height: mdDown ? 500 : 500 }}
              cols={2}
              rowHeight={'auto'}
            >
              <ImageListItem>
                <img src="https://scontent.fsod2-1.fna.fbcdn.net/v/t1.6435-9/117646915_1610527002438735_6655358077694222711_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=730e14&_nc_ohc=iWGxVN3c3m0AX9Y83nu&_nc_ht=scontent.fsod2-1.fna&oh=00_AfAb4griE4ae9cE3LRygfxpQJPGcSV6szp_uGR6zrX6RaA&oe=6408B2EF" />
                <img src="https://scontent.fsod2-1.fna.fbcdn.net/v/t1.6435-9/165110199_1802135823277851_5957915723346126797_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=a26aad&_nc_ohc=hVgT-VvQbpIAX92n9Hf&tn=O3EcyzBfwA2FUv1M&_nc_ht=scontent.fsod2-1.fna&oh=00_AfC7FK4htz7__GiMmSlY2vRbH3YBnj7-Nc8QSvlUkyBVaQ&oe=6408C773" />
                <img src="https://scontent.fsod2-1.fna.fbcdn.net/v/t1.6435-9/120333128_1655979527893482_5850540166651263102_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=730e14&_nc_ohc=RI_hLBSiPOUAX8Jjq68&_nc_ht=scontent.fsod2-1.fna&oh=00_AfBZKsp0jJfJ5TQtoNPGOQjMA9f1wYdZm7yvZHGq8KA-Qg&oe=6408CD2F" />
              </ImageListItem>
              <ImageListItem>
                <img src="https://scontent.fsod2-1.fna.fbcdn.net/v/t1.6435-9/44052383_1072789406212500_7832897450179297280_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=L3TC9mKZlywAX-qnSQ2&_nc_ht=scontent.fsod2-1.fna&oh=00_AfCJwVhDpoKrYPnl-cFiC3MMOUKY0XViMFi2lTVmWT4lrA&oe=6408C046" />
                <img src="https://scontent.fsod2-1.fna.fbcdn.net/v/t31.18172-8/19452802_783183385173105_3658689183661321560_o.jpg?_nc_cat=100&ccb=1-7&_nc_sid=730e14&_nc_ohc=xzQVBrQmJyEAX92twmi&_nc_ht=scontent.fsod2-1.fna&oh=00_AfBf7Tk6bhWnApTW3mQbuhDaOuMv_n17vXc8St2sB4TSMg&oe=6408D2ED" />
                <img src="https://scontent.fsod2-1.fna.fbcdn.net/v/t39.30808-6/300149992_2195821223909307_6425751082139695509_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=a26aad&_nc_ohc=Fr8zA3BFKAEAX_1F7B9&_nc_ht=scontent.fsod2-1.fna&oh=00_AfA79QLTJt2RJtLRY4DEx0u9YyjKMpGPs-YZMgTr-M0bgw&oe=63E5B06B" />
              </ImageListItem>
            </ImageList>
          </Box>
        )}
      </Box>

      <Box
        display={'flex'}
        flexDirection="column"
        alignItems="center"
        justifyContent={'center'}
        mt={5}
        width={'100%'}
        height={smDown ? '150px' : mdDown ? '200px' : '300px'}
        sx={{
          background:
            'linear-gradient(0deg, rgba(93,173,226,1) 0%, rgba(214,234,248,1) 100%);',
        }}
      >
        <Typography
          textAlign={'center'}
          fontSize={smDown ? 20 : mdDown ? 40 : 60}
        >
          Mais de 15 lojas esperando por você
        </Typography>
        <Typography fontSize={smDown ? 15 : mdDown ? 20 : 40}>
          Venha se refrescar com a gente!
        </Typography>
        <Box
          display="flex"
          alignItems={'center'}
          sx={{
            ':hover': {
              backgroundColor: '#AED6F1',
              borderRadius: '10px',
            },
            borderRadius: '10px',
          }}
        >
          <ListItemLink to="/lojas" label="Nossas Unidades" />
        </Box>
      </Box>
    </LayoutBaseDePagina>
  );
};
