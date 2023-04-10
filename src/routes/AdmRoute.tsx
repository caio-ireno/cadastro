import { Route, Routes } from 'react-router-dom'

import { DetalheContatoAdm } from '../pages/adm/DetalheContatoAdm'
import { DetalheHistoriaAdm } from '../pages/adm/DetalheHistoriaAdm'
import { DetalheLojasAdm } from '../pages/adm/DetalheLojasAdm'
import { DetalheNoticiasAdm } from '../pages/adm/DetalheNoticiasAdm'
import { DetalheSorveteAdm } from '../pages/adm/DetalheSorveteAdm'
import { DetalheTipoSorvete } from '../pages/adm/DetalheTipoSorvete'
import { DetalheUser } from '../pages/adm/DetalheUser'
import { LojaAdm } from '../pages/adm/LojaAdm'
import { NoticiaAdm } from '../pages/adm/NoticiaAdm'
import { SorveteAdm } from '../pages/adm/SorveteAdm'
import { TipoSorveteAdms } from '../pages/adm/TipoSorveteAdm'

export const AdmRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<SorveteAdm />} />
      <Route path="/sorvetes" element={<SorveteAdm />} />
      <Route path="/sorvetes/:id" element={<DetalheSorveteAdm />} />

      <Route path="/noticias" element={<NoticiaAdm />} />
      <Route path="/noticias/:id" element={<DetalheNoticiasAdm />} />

      <Route path="/lojas" element={<LojaAdm />} />
      <Route path="/lojas/:id" element={<DetalheLojasAdm />} />

      <Route path="/historias/:id" element={<DetalheHistoriaAdm />} />

      <Route path="/contato/:id" element={<DetalheContatoAdm />} />
      <Route path="/user" element={<DetalheUser />} />

      <Route path="/tipo-sorvete" element={<TipoSorveteAdms />} />
      <Route path="/tipo-sorvete/:id" element={<DetalheTipoSorvete />} />
    </Routes>
  )
}
