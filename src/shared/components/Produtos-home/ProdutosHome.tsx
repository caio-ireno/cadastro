import { Button, Typography, useMediaQuery } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import React from 'react';
import { LightTheme } from '../../theme';

interface ProdutosHomeProps {
  imgProduto: string;
  icon: string;
  labelProduto: string;
  nameProduto: string;
}

export const ProdutosHome: React.FC<ProdutosHomeProps> = ({
  imgProduto,
  icon,
  labelProduto,
  nameProduto,
}) => {
  const themeColor = LightTheme;
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      display={'flex'}
      flexDirection="column"
      alignItems={'center'}
      width="500px"
      gap={4}
      mt={5}
      sx={{ backgroundColor: themeColor.palette.secondary.main }}
    >
      <Box
        sx={{ objectFit: 'cover' }}
        width={'100%'}
        height={smDown ? '200px' : mdDown ? '300px' : '500px'}
        component="img"
        src={imgProduto}
      />
      <Box
        width={smDown ? '50px' : mdDown ? '70px' : '100px'}
        height="auto"
        component="img"
        src={icon}
      />
      <Typography textAlign={'center'} fontWeight={'bold'} fontSize={25}>
        {nameProduto}
      </Typography>

      <Typography textAlign={'center'}>{labelProduto}</Typography>

      <Button variant="contained">Saiba Mais</Button>
    </Box>
  );
};
