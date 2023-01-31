import { Box } from '@mui/system';
import React, { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { FerramentasDaLista } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { SorveteService } from '../../shared/services/api/sorvete/SorveteService';

export const ListaSorvetes: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(3000);

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  useEffect(() => {
    debounce(() => {
      SorveteService.getAll(1, busca).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
          return;
        }
        console.log(result);
      });
    });
  }, [busca]);

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
