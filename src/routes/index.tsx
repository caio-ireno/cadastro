import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard, ListaSorvetes } from '../pages';
import { ListaAdm } from '../pages/adm/ListaAdm';
import { Historia } from '../pages/historia/Historia';
import { ListaLojas } from '../pages/lojas/ListaLojas';
import { SorveteAçai } from '../pages/sorvetes/SorveteAçai';
import { SorveteCopão } from '../pages/sorvetes/SorveteCopão';
import { SorveteEspecial } from '../pages/sorvetes/SorveteEspecial';
import { SorveteGourmet } from '../pages/sorvetes/SorveteGourmet';
import { SorveteLinhaZero } from '../pages/sorvetes/SorveteLinhaZero';
import { SorveteMaisPopulares } from '../pages/sorvetes/SorveteMaisPopulares';
import { SorvetePicole } from '../pages/sorvetes/SorvetePicole';
import { SorveteStandart } from '../pages/sorvetes/SorveteStandart';
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
      <Route path="/lojas" element={<ListaLojas />} />
      <Route path="/historia" element={<Historia />} />
      <Route path="/sorvetes/especial" element={<SorveteEspecial />} />
      <Route path="/sorvetes/standart" element={<SorveteStandart />} />
      <Route path="/sorvetes/gourmet" element={<SorveteGourmet />} />
      <Route path="/sorvetes/picole" element={<SorvetePicole />} />
      <Route path="/sorvetes/acai" element={<SorveteAçai />} />
      <Route path="/sorvetes/copao" element={<SorveteCopão />} />
      <Route path="/sorvetes/linha-zero" element={<SorveteLinhaZero />} />
      <Route
        path="/sorvetes/mais-populares"
        element={<SorveteMaisPopulares />}
      />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
      <Route
        path="/sorvetes"
        element={<Navigate to="/sorvetes/mais-populares" />}
      />
    </Routes>
  );
};
