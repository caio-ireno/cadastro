import { BorderBottom } from '@mui/icons-material';
import {
  Drawer,
  ListItemButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { useAppThemeContext, useDrawerContext } from '../../contexts';

interface ListItemLinkProps {
  label: string;
  to: string;
  onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<ListItemLinkProps> = ({ to, label, onClick }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const resolvePath = useResolvedPath(to);
  const match = useMatch({ path: resolvePath.pathname, end: false });
  const handleClick = () => {
    navigate(to);
    onClick?.();
  };
  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <Typography fontSize={mdDown ? 18 : 25} fontWeight={'bold'}>
        {label}
      </Typography>
    </ListItemButton>
  );
};

interface MenuLateralProps {
  children: React.ReactNode;
}

export const MenuLateral: React.FC<MenuLateralProps> = ({ children }) => {
  // const { toggleTheme, themeName } = useAppThemeContext();

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();

  return (
    <>
      <Drawer
        PaperProps={{
          sx: {
            borderBottom: 'none',
          },
        }}
        anchor={smDown ? 'left' : 'top'}
        open={isDrawerOpen}
        variant={smDown ? 'temporary' : 'permanent'}
        onClose={toggleDrawerOpen}
      >
        <Box
          display="flex"
          alignItems={'center'}
          justifyContent="center"
          flexDirection={smDown ? 'column' : 'row'}
          height="auto"
          gap={mdDown ? '10px' : '50px'}
        >
          <Box display="flex" alignItems={'center'} justifyContent="center">
            <Box
              sx={{
                height: theme.spacing(8),
                width: theme.spacing(12),
              }}
              component="img"
              src="https://static.goomer.app/stores/63568/products/mobile_menu/templates/91794/logo_v1600432939.png"
            />
          </Box>

          <Box>
            <Box
              display="flex"
              flexDirection={smDown ? 'column' : 'row'}
              gap={mdDown ? '10px' : '50px'}
            >
              {drawerOptions.map((drawerOption) => (
                <ListItemLink
                  key={drawerOption.path}
                  to={drawerOption.path}
                  label={drawerOption.label}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Drawer>

      <Box height="100vh" marginTop={smDown ? 0 : theme.spacing(8)}>
        {children}
      </Box>
    </>
  );
};
