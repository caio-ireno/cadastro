import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard, ListaSorvetes } from '../pages';
import { useDrawerContext } from '../shared/contexts';
export const AppRoutes = () => {
  const { setDrawerOption } = useDrawerContext();

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
      {
        icon: 'location_city',
        label: 'Lojas',
        path: '/lojas',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/sorvetes" element={<ListaSorvetes />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
