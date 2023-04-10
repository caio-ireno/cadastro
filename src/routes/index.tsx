import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { Dashboard, ListaSorvetes } from '../pages'
import { Historia } from '../pages/historia/Historia'
import { ListaLojas } from '../pages/lojas/ListaLojas'
import { useDrawerContext } from '../shared/contexts'

export const AppRoutes = () => {
  const { setDrawerOption } = useDrawerContext()

  useEffect(() => {
    setDrawerOption([
      {
        label: 'Página inicial',
        path: '/pagina-inicial',
      },
      {
        label: 'Sorvetes',
        path: '/sorvetes/',
      },

      {
        label: 'Lojas',
        path: '/lojas',
      },
      {
        label: 'História',
        path: '/historia',
      },
    ])
  }, [])

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />
      <Route path="/lojas" element={<ListaLojas />} />
      <Route path="/historia" element={<Historia />} />

      <Route path="/sorvetes" element={<ListaSorvetes />} />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />

      <Route path="/sorvetes" element={<Navigate to="/sorvetes/gourmet" />} />

      <Route path="/sorvetes">
        <Route path="/sorvetes" element={<Navigate to="/sorvetes/gourmet" />} />
        <Route path=":idOrName" element={<ListaSorvetes />} />
      </Route>
    </Routes>
  )
}
