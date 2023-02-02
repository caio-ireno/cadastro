import { LayoutBaseDePagina } from '../../shared/layouts';
import FerramentasDeDetalhe from '../../shared/components/Ferramenta-de-detalhe/FerramentasDeDetalhe';

export const Dashboard = () => {
  return (
    <LayoutBaseDePagina
      barraDeFerramentas={<FerramentasDeDetalhe />}
      titulo="Pagina inicial"
    >
      teste
    </LayoutBaseDePagina>
  );
};
