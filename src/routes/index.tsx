import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard, ListaSorvetes } from '../pages';
import { Historia } from '../pages/historia/Historia';
import { ListaLojas } from '../pages/lojas/ListaLojas';

import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
  const { setDrawerOption } = useDrawerContext();

  useEffect(() => {
    setDrawerOption([
      {
        label: 'Página inicial',
        path: '/pagina-inicial',
      },
      {
        label: 'Sorvetes',
        path: '/sorvetes/mais-populares',
      },
      {
        label: 'Lojas',
        path: '/lojas',
      },
      {
        label: 'Historia',
        path: '/historia',
      },
      {
        label: 'Adm',
        path: '/adm-page',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />
      <Route path="/lojas" element={<ListaLojas />} />
      <Route path="/historia" element={<Historia />} />
      <Route path="/sorvetes" element={<ListaSorvetes />} />
      <Route path="/sorvetes/especial" element={<ListaSorvetes />} />
      <Route path="/sorvetes/standart" element={<ListaSorvetes />} />
      <Route path="/sorvetes/gourmet" element={<ListaSorvetes />} />
      <Route path="/sorvetes/picole" element={<ListaSorvetes />} />
      <Route path="/sorvetes/acai" element={<ListaSorvetes />} />
      <Route path="/sorvetes/copao" element={<ListaSorvetes />} />
      <Route path="/sorvetes/linha-zero" element={<ListaSorvetes />} />
      <Route path="/sorvetes/mais-populares" element={<ListaSorvetes />} />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
      <Route
        path="/sorvetes"
        element={<Navigate to="/sorvetes/mais-populares" />}
      />
    </Routes>
  );
};
