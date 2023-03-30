import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Dashboard, ListaSorvetes } from "../pages";
import { DetalheLojasAdm } from "../pages/adm/DetalheLojasAdm";
import { DetalheNoticiasAdm } from "../pages/adm/DetalheNoticiasAdm";
import { DetalheSorveteAdm } from "../pages/adm/DetalheSorveteAdm";
import { DetalheTipoSorvete } from "../pages/adm/DetalheTipoSorvete";
import { LojaAdm } from "../pages/adm/LojaAdm";
import { NoticiaAdm } from "../pages/adm/NoticiaAdm";
import { SorveteAdm } from "../pages/adm/SorveteAdm";
import { TipoSorveteAdms } from "../pages/adm/TipoSorveteAdm";
import { Historia } from "../pages/historia/Historia";
import { ListaLojas } from "../pages/lojas/ListaLojas";
import { useDrawerContext } from "../shared/contexts";
import { useDebounce } from "../shared/hooks";
import {
  AllTypes,
  SorveteProps,
} from "../shared/services/api/sorvete/AllTypes";

export const AppRoutes = () => {
  const { setDrawerOption } = useDrawerContext();
  const [rows, setRows] = useState<SorveteProps[]>([]);
  const { debounce } = useDebounce();

  useEffect(() => {
    setDrawerOption([
      {
        label: "Página inicial",
        path: "/pagina-inicial",
      },
      {
        label: "Sorvetes",
        path: "/sorvetes/",
      },

      {
        label: "Lojas",
        path: "/lojas",
      },
      {
        label: "Historia",
        path: "/historia",
      },
      {
        label: "Adm",
        path: "/adm-page",
      },
    ]);
  }, []);

  useEffect(() => {
    debounce(() => {
      AllTypes.getAll().then((result) => {
        console.log(result);
        if (result instanceof Error) {
          alert(result.message);
          return;
        } else {
          setRows(result.data);
        }
      });
    });
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />
      <Route path="/lojas" element={<ListaLojas />} />
      <Route path="/historia" element={<Historia />} />

      <Route path="/adm-page" element={<SorveteAdm />} />
      <Route path="/adm-page/sorvetes" element={<SorveteAdm />} />
      <Route path="/adm-page/sorvetes/:id" element={<DetalheSorveteAdm />} />

      <Route path="/adm-page/noticias" element={<NoticiaAdm />} />
      <Route path="/adm-page/noticias/:id" element={<DetalheNoticiasAdm />} />

      <Route path="/adm-page/lojas" element={<LojaAdm />} />
      <Route path="/adm-page/lojas/:id" element={<DetalheLojasAdm />} />

      <Route path="/adm-page/tipo-sorvete" element={<TipoSorveteAdms />} />
      <Route
        path="/adm-page/tipo-sorvete/:id"
        element={<DetalheTipoSorvete />}
      />

      <Route path="/sorvetes" element={<ListaSorvetes />} />

      {rows.map((row) => (
        <Route
          key={row.id}
          path={`/sorvetes/${row.tipo}`}
          element={<ListaSorvetes />}
        />
      ))}

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />

      <Route path="/sorvetes" element={<Navigate to="/sorvetes/gourmet" />} />
    </Routes>
  );
};
