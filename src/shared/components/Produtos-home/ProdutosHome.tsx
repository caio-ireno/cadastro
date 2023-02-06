import { ListItemButton, Typography, useMediaQuery } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import React from 'react';
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

interface ProdutosHomeProps {
  imgProduto: string;
  icon: string;
  labelProduto: string;
  nameProduto: string;
  to: string;
}

export const ProdutosHome: React.FC<ProdutosHomeProps> = ({
  imgProduto,
  icon,
  labelProduto,
  nameProduto,
  to,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      p={1}
      display={'flex'}
      flexDirection="column"
      alignItems={'center'}
      gap={smDown ? 1 : 3}
      mt={5}
      sx={{ backgroundColor: '#EAEDED' }}
    >
      <Box
        sx={{ objectFit: 'cover' }}
        width={'100%'}
        height={smDown ? '200px' : mdDown ? '200px' : '400px'}
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

      <Typography
        fontSize={smDown ? 15 : mdDown ? 20 : 25}
        textAlign={'center'}
      >
        {labelProduto}
      </Typography>

      <ListItemLink label="Saiba Mais" to={to} />
    </Box>
  );
};
