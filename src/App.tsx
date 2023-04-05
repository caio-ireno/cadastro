import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Login } from './pages/login/Login'
import { AppRoutes } from './routes'
import { AdmRoute } from './routes/AdmRoute'
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
            <Route path="/adm-page/*" element={<AdmRoute />} />
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
