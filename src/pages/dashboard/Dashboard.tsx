import { LayoutBaseDePagina } from '../../shared/layouts';
import { BarraDeFerramentas } from '../../shared/components';

export const Dashboard = () => {
  return (
    <LayoutBaseDePagina
      barraDeFerramentas={<BarraDeFerramentas mostarInputBusca />}
      titulo="pagina inicial"
    >
      Testandos
    </LayoutBaseDePagina>
  );
};
