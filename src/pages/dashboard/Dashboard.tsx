import { Typography, useMediaQuery, useTheme } from '@mui/material'
import { Box } from '@mui/system'

import { CarouselComponent } from '../../shared/components/carousel/CarouselComponent '
import { ListItemLink } from '../../shared/components/List Item Link/ListItemLink'
import { ProdutosHome } from '../../shared/components/Produtos-home/ProdutosHome'
import { LayoutBaseDePagina } from '../../shared/layouts'

export const Dashboard = () => {
  const theme = useTheme()
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

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
          imgProduto="https://images.unsplash.com/photo-1504380790957-2616a8994f18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          to="/sorvetes/açaí"
        />
        <ProdutosHome
          icon="https://cdn-icons-png.flaticon.com/512/3132/3132683.png"
          nameProduto="Picole Zero"
          labelProduto="É uma explosão de sabor e energia a qualquer momento do dia. Que tal uma dose de energia hoje? "
          imgProduto="https://images.unsplash.com/photo-1504380790957-2616a8994f18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          to="/sorvetes/linha zero"
        />
        <ProdutosHome
          icon="https://static.thenounproject.com/png/2463767-200.png"
          nameProduto="Sorvetes Urla"
          labelProduto="É uma explosão de sabor e energia a qualquer momento do dia. Que tal uma dose de energia hoje?"
          imgProduto="https://images.unsplash.com/photo-1629385701021-fcd568a743e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          to="/sorvetes/gourmet"
        />
      </Box>

      <Box
        display="flex"
        alignItems={'center'}
        justifyContent="center"
        flexDirection="row"
        width={'100%'}
        mt={4}
      >
        <Box
          width={'150%'}
          px={4}
          display="flex"
          alignItems={'center'}
          justifyContent="center"
          flexDirection="column"
          gap={5}
        >
          <Typography
            textAlign={'center'}
            fontWeight={'bold'}
            fontSize={smDown ? 20 : mdDown ? 35 : 45}
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

        {!mdDown && (
          <Box
            display="flex"
            alignItems={'center'}
            justifyContent="center"
            flexDirection="row"
            width={'100%'}
          >
            <Box
              borderRadius={1}
              sx={{ objectFit: 'cover' }}
              width={'100%'}
              height={smDown ? '200px' : mdDown ? '250px' : '400px'}
              component="img"
              src="https://images.unsplash.com/photo-1630569266941-f8a348786bf0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80"
            />
          </Box>
        )}
      </Box>

      <Box
        position={'relative'}
        display={'flex'}
        flexDirection="column"
        alignItems="center"
        justifyContent={'center'}
        mt={4}
        width={'100%'}
        height={smDown ? '150px' : mdDown ? '200px' : '300px'}
      >
        <Box
          sx={{
            objectFit: 'cover',
            opacity: '0.5',
          }}
          width={'100%'}
          height="100%"
          component="img"
          src="https://images.unsplash.com/photo-1525451167239-264fb77ad20f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        />
        <Box
          display={'flex'}
          flexDirection="column"
          alignItems="center"
          justifyContent={'center'}
          position={'absolute'}
          gap={2}
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
      </Box>
    </LayoutBaseDePagina>
  )
}
