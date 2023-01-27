import { Box } from '@mui/system';
import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FerramentasDaLista } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';

export const ListaSorvetes: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);
  return (
    <LayoutBaseDePagina
      titulo="Lista Sorvetes"
      barraDeFerramentas={
        <FerramentasDaLista
          mostarInputBusca
          textoBusca={busca}
          aoMudarTextoBusca={(texto) =>
            setSearchParams({ busca: texto }, { replace: true })
          }
        />
      }
    >
      <Box></Box>
    </LayoutBaseDePagina>
  );
};
