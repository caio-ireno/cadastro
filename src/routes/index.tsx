import { Button } from '@mui/material';
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
export const AppRoutes = () => {
  const { toggleDrawerOpen, setDrawerOption } = useDrawerContext();

  useEffect(() => {
    setDrawerOption([
      {
        icon: 'home',
        label: 'Página inicial',
        path: '/',
      },
      {
        icon: 'icecream',
        label: 'Sorvetes',
        path: '/sorvetes',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Button
            variant="contained"
            color="secondary"
            onClick={toggleDrawerOpen}
          >
            Open Menu
          </Button>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
