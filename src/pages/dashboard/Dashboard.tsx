import { LayoutBaseDePagina } from '../../shared/layouts';
import FerramentasDeDetalhe from '../../shared/components/Ferramenta-de-detalhe/FerramentasDeDetalhe';

export const Dashboard = () => {
  return (
    <LayoutBaseDePagina
      barraDeFerramentas={<FerramentasDeDetalhe mostarBotaoSalvarEFechar />}
      titulo="pagina inicial"
    >
      Testandos
    </LayoutBaseDePagina>
  );
};
