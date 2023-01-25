import { LayoutBaseDePagina } from '../../shared/layouts';
import FerramentasDeDetalhe from '../../shared/components/Ferramenta-de-detalhe/FerramentasDeDetalhe';

export const Dashboard = () => {
  return (
    <LayoutBaseDePagina
      barraDeFerramentas={<FerramentasDeDetalhe />}
      titulo="pagina inicial"
    >
      Testandos
    </LayoutBaseDePagina>
  );
};
