import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { Login } from './pages/login/Login'
import { AppRoutes } from './routes'
import { AdmRoute } from './routes/AdmRoute'
import { MenuLateral } from './shared/components'
import { AppThemeProvider, DrawerProvider } from './shared/contexts'
import ScrollToTopOnNavigate from './shared/hooks/ScrollToTopNavigate'

interface PrivateRouteProps {
  isAuthenticated: boolean
  element: React.ReactNode
}

function PrivateRoute({ isAuthenticated, element }: PrivateRouteProps) {
  return isAuthenticated ? <>{element}</> : <Navigate to="/login" />
}

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  function handleLogin() {
    // faz a chamada de autenticação e define a variável isAuthenticated como true
    setIsAuthenticated(true)
  }

  useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    setIsAuthenticated(!!authToken) // Define a variável isAuthenticated como true se o token de autenticação estiver presente
  }, [])
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <ScrollToTopOnNavigate />
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/adm-page/*"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  element={<AdmRoute />}
                />
              }
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
