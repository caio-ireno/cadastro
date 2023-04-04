import { Typography, useMediaQuery, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'

import { CarouselComponent } from '../../shared/components/carousel/CarouselComponent '
import { ListItemLink } from '../../shared/components/List Item Link/ListItemLink'
import { ProdutosHome } from '../../shared/components/Produtos-home/ProdutosHome'
import { useDebounce } from '../../shared/hooks'
import { LayoutBaseDePagina } from '../../shared/layouts'
import { HistoriaService } from '../../shared/services/api/historia/HistoriaService'

export const Dashboard = () => {
  const theme = useTheme()
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const { debounce } = useDebounce()
  const [rows, setRows] = useState<string>('')

  useEffect(() => {
    debounce(() => {
      HistoriaService.getAll().then(result => {
        if (result instanceof Error) {
          alert(result.message)
          return
        } else {
          setRows(result.data[0].textoHistoriaHome)
        }
      })
    })
  }, [])

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
          imgProduto="https://i.ibb.co/whQzTv1/acai.png"
          to="/sorvetes/açaí"
        />
        <ProdutosHome
          icon="https://cdn-icons-png.flaticon.com/512/3132/3132683.png"
          nameProduto="Picole Zero"
          labelProduto="É uma explosão de sabor e energia a qualquer momento do dia. Que tal uma dose de energia hoje? "
          imgProduto="https://i.ibb.co/bHLtv3q/28660419-917346951756747-1957560773722520013-n.jpg"
          to="/sorvetes/linha zero"
        />
        <ProdutosHome
          icon="https://static.thenounproject.com/png/2463767-200.png"
          nameProduto="Sorvetes Urla"
          labelProduto="É uma explosão de sabor e energia a qualquer momento do dia. Que tal uma dose de energia hoje?"
          imgProduto="https://i.ibb.co/S0wmB3K/53633608-1169841463173960-2174527888831807488-n.jpg"
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
            {rows}
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
              src="https://i.ibb.co/w4C21fF/equipe-urla.jpg"
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
          src="https://i.ibb.co/7RmfHtc/pac-man-urla.jpg"
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
