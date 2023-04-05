import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { DetalheContatoAdm } from './pages/adm/DetalheContatoAdm'
import { DetalheHistoriaAdm } from './pages/adm/DetalheHistoriaAdm'
import { DetalheLojasAdm } from './pages/adm/DetalheLojasAdm'
import { DetalheNoticiasAdm } from './pages/adm/DetalheNoticiasAdm'
import { DetalheSorveteAdm } from './pages/adm/DetalheSorveteAdm'
import { DetalheTipoSorvete } from './pages/adm/DetalheTipoSorvete'
import { LojaAdm } from './pages/adm/LojaAdm'
import { NoticiaAdm } from './pages/adm/NoticiaAdm'
import { SorveteAdm } from './pages/adm/SorveteAdm'
import { TipoSorveteAdms } from './pages/adm/TipoSorveteAdm'
import { Login } from './pages/login/Login'
import { AppRoutes } from './routes'
import { MenuLateral } from './shared/components'
import { AppThemeProvider, DrawerProvider } from './shared/contexts'
import ScrollToTopOnNavigate from './shared/hooks/ScrollToTopNavigate'

export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <ScrollToTopOnNavigate />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/adm-page" element={<SorveteAdm />} />
            <Route path="/adm-page/sorvetes" element={<SorveteAdm />} />
            <Route
              path="/adm-page/sorvetes/:id"
              element={<DetalheSorveteAdm />}
            />

            <Route path="/adm-page/noticias" element={<NoticiaAdm />} />
            <Route
              path="/adm-page/noticias/:id"
              element={<DetalheNoticiasAdm />}
            />

            <Route path="/adm-page/lojas" element={<LojaAdm />} />
            <Route path="/adm-page/lojas/:id" element={<DetalheLojasAdm />} />

            <Route
              path="/adm-page/historias/:id"
              element={<DetalheHistoriaAdm />}
            />

            <Route
              path="/adm-page/contato/:id"
              element={<DetalheContatoAdm />}
            />

            <Route
              path="/adm-page/tipo-sorvete"
              element={<TipoSorveteAdms />}
            />
            <Route
              path="/adm-page/tipo-sorvete/:id"
              element={<DetalheTipoSorvete />}
            />
            <Route
              path="*"
              element={
                <MenuLateral>
                  <AppRoutes />
                </MenuLateral>
              }
            />
          </Routes>
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  )
}
