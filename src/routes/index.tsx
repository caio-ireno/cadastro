import { Button } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
export const AppRoutes = () => {
  const { toggleDrawerOpen } = useDrawerContext();

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
