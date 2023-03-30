import {
  Drawer,
  ListItemButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useDrawerContext } from '../../contexts'
import { Footer } from '../footer/Footer'

interface ListItemLinkProps {
  label: string
  to: string
  onClick: (() => void) | undefined
}

const ListItemLink: React.FC<ListItemLinkProps> = ({ to, label, onClick }) => {
  const theme = useTheme()
  // const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(to)
    window.scroll(0, 0)

    onClick?.()
  }
  return (
    <ListItemButton
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
      <Typography fontSize={mdDown ? 18 : 25} fontWeight={'bold'}>
        {label}
      </Typography>
    </ListItemButton>
  )
}

interface MenuLateralProps {
  children: React.ReactNode
}

export const MenuLateral: React.FC<MenuLateralProps> = ({ children }) => {
  // const { toggleTheme, themeName } = useAppThemeContext();

  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext()

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
          py={2}
          display="flex"
          alignItems={'center'}
          justifyContent="center"
          flexDirection={smDown ? 'column' : 'row'}
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
              {drawerOptions.map(drawerOption => (
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

      <Box marginTop={smDown ? 0 : theme.spacing(12)}>{children}</Box>

      <Footer />
    </>
  )
}
