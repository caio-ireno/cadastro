import { LayoutBaseDePagina } from '../../shared/layouts';
import { FerramentasDaLista } from '../../shared/components';

export const Dashboard = () => {
  return (
    <LayoutBaseDePagina
      barraDeFerramentas={<FerramentasDaLista mostarInputBusca />}
      titulo="pagina inicial"
    >
      Testandos
    </LayoutBaseDePagina>
  );
};
