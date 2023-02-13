import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from '../pages';
import { Historia } from '../pages/historia/Historia';
import { ListaLojas } from '../pages/lojas/ListaLojas';
// import { SorveteAçai } from '../pages/sorvetes/SorveteAçai';
// import { SorveteCopão } from '../pages/sorvetes/SorveteCopão';
// import { SorveteEspecial } from '../pages/sorvetes/SorveteEspecial';
// import { SorveteGourmet } from '../pages/sorvetes/SorveteGourmet';
// import { SorveteLinhaZero } from '../pages/sorvetes/SorveteLinhaZero';
// import { SorveteMaisPopulares } from '../pages/sorvetes/SorveteMaisPopulares';
// import { SorvetePicole } from '../pages/sorvetes/SorvetePicole';
// import { SorveteStandart } from '../pages/sorvetes/SorveteStandart';
import { TesteSorvete } from '../pages/Teste Sorvete/TesteSorvete';
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
        path: '/especial',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />
      <Route path="/especial" element={<TesteSorvete />} />
      <Route path="/lojas" element={<ListaLojas />} />
      <Route path="/historia" element={<Historia />} />
      <Route path="/sorvetes/especial" element={<TesteSorvete />} />
      <Route path="/sorvetes/standart" element={<TesteSorvete />} />
      <Route path="/sorvetes/gourmet" element={<TesteSorvete />} />
      <Route path="/sorvetes/picole" element={<TesteSorvete />} />
      <Route path="/sorvetes/acai" element={<TesteSorvete />} />
      <Route path="/sorvetes/copao" element={<TesteSorvete />} />
      <Route path="/sorvetes/linha-zero" element={<TesteSorvete />} />
      <Route path="/sorvetes/mais-populares" element={<TesteSorvete />} />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
      <Route
        path="/sorvetes"
        element={<Navigate to="/sorvetes/mais-populares" />}
      />
    </Routes>
  );
};
