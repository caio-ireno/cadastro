import {
  Divider,
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { useAppThemeContext, useDrawerContext } from '../../contexts';
import { DarkTheme } from '../../theme';

interface ListItemLinkProps {
  label: string;
  icon: string;
  to: string;
  onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<ListItemLinkProps> = ({
  to,
  icon,
  label,
  onClick,
}) => {
  const theme = DarkTheme;
  const navigate = useNavigate();
  const resolvePath = useResolvedPath(to);
  const match = useMatch({ path: resolvePath.pathname, end: false });
  const handleClick = () => {
    navigate(to);
    onClick?.();
  };
  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

interface MenuLateralProps {
  children: React.ReactNode;
}

export const MenuLateral: React.FC<MenuLateralProps> = ({ children }) => {
  const { toggleTheme, themeName } = useAppThemeContext();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? 'temporary' : 'permanent'}
        onClose={toggleDrawerOpen}
      >
        <Box
          width={theme.spacing(28)}
          display="flex"
          flexDirection={'column'}
          height="100%"
        >
          <Box
            width={'100%'}
            height={theme.spacing(20)}
            display="flex"
            alignItems={'center'}
            justifyContent="center"
          >
            <Box
              sx={{
                height: theme.spacing(15),
                width: theme.spacing(20),
              }}
              component="img"
              src="https://static.goomer.app/stores/63568/products/mobile_menu/templates/91794/logo_v1600432939.png"
            />
          </Box>

          <Divider />

          <List component="nav">
            <ListItemButton onClick={toggleTheme}>
              <ListItemIcon>
                <Box
                  component="img"
                  sx={{
                    height: theme.spacing(3),
                    width: theme.spacing(3),
                  }}
                  src={
                    themeName === 'dark'
                      ? require('../../../assets/lua.png')
                      : require('../../../assets/sun.png')
                  }
                />
              </ListItemIcon>
              <ListItemText
                primary={themeName === 'dark' ? 'Modo Escuro' : 'Modo Claro'}
              />
            </ListItemButton>
          </List>

          <Box flex={1}>
            <List component={'nav'}>
              {drawerOptions.map((drawerOption) => (
                <ListItemLink
                  key={drawerOption.path}
                  icon={drawerOption.icon}
                  to={drawerOption.path}
                  label={drawerOption.label}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
