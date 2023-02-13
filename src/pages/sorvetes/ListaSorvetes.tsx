import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  ListItemButton,
} from '@mui/material';
import React from 'react';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';

import { LayoutBaseDePagina } from '../../shared/layouts';

interface ListItemLinkProps {
  label: string;
  to: string;
}

const ListItemLink: React.FC<ListItemLinkProps> = ({ to, label }) => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);
  const pathName = resolvedPath.pathname.replace('/sorvete/', '');
  const match = useMatch({ path: pathName, end: false });

  const handleClick = () => {
    navigate(to);
  };
  return (
    <Box
      display={'flex'}
      sx={{
        ':hover': {
          backgroundColor: '#fff',
          textDecorationLine: 'underline',
          textDecorationColor: '#5DADE2',
          textDecorationThickness: '5px ',
          textDecorationSkipInk: 'none',
        },
      }}
      onClick={handleClick}
    >
      <Typography
        selected={!!match}
        component={ListItemButton}
        fontSize={mdDown ? 15 : 20}
        fontWeight={'bold'}
      >
        {label}
      </Typography>
    </Box>
  );
};

interface ListaSorvetelProps {
  children?: React.ReactNode;
}
export const ListaSorvetes: React.FC<ListaSorvetelProps> = ({ children }) => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
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
          src="https://scontent.fsod2-1.fna.fbcdn.net/v/t1.6435-9/66519501_1254182294739876_5684698909167845376_n.png?_nc_cat=106&ccb=1-7&_nc_sid=e3f864&_nc_ohc=Lp9HcMhNDQkAX_wEcoE&tn=O3EcyzBfwA2FUv1M&_nc_ht=scontent.fsod2-1.fna&oh=00_AfDmDg7ile9A5fifYYhYM3LjWD09SJiF1qWDTXm9fpGJug&oe=6409A5F2"
        />
      </Box>

      <Box
        borderBottom={'1px solid'}
        width={'100%'}
        display={'flex'}
        flexDirection="row"
        justifyContent={'center'}
        alignItems="center"
        flexWrap={'wrap'}
        mt={mdDown ? 5 : 10}
        gap={mdDown ? 1 : 3}
      >
        <ListItemLink to="/sorvetes/mais-populares" label="mais populares" />
        <ListItemLink to="/sorvetes/gourmet" label="Gourmet" />
        <ListItemLink to="/sorvetes/standart" label="Standart" />
        <ListItemLink to="/sorvetes/especial" label="Especial" />
        <ListItemLink to="/sorvetes/picole" label="Picole" />
        <ListItemLink to="/sorvetes/linha-zero" label="Linha Zero" />
        <ListItemLink to="/sorvetes/acai" label="Açai" />
        <ListItemLink to="/sorvetes/copao" label="Copão" />
      </Box>

      <Box>{children}</Box>
    </LayoutBaseDePagina>
  );
};
