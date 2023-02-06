import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard, ListaSorvetes } from '../pages';
import { ListaAdm } from '../pages/adm/ListaAdm';
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
        path: '/sorvetes',
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
      <Route path="/sorvetes" element={<ListaSorvetes />} />
      <Route path="/lojas" element={<ListaLojas />} />
      <Route path="/adm-page" element={<ListaAdm />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
