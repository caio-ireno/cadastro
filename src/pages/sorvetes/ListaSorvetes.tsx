import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  LinearProgress,
  Pagination,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Icon,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { FerramentasDaLista } from '../../shared/components';
import { Environment } from '../../shared/environment';
import { useDebounce } from '../../shared/hooks';
import { LayoutBaseDePagina } from '../../shared/layouts';
import {
  SorveteProps,
  SorveteService,
} from '../../shared/services/api/sorvete/SorveteService';
import { DarkTheme } from '../../shared/theme';

export const ListaSorvetes: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();

  const theme = DarkTheme;

  const [rows, setRows] = useState<SorveteProps[]>([]);
  const [totalCount, SetTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get('pagina') || '1');
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      SorveteService.getAll(pagina, busca).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          return;
        } else {
          console.log(result);

          setRows(result.data);
          SetTotalCount(result.totalCount);
        }
      });
    });
  }, [busca, pagina]);

  return (
    <LayoutBaseDePagina
      titulo="Lista Sorvetes"
      barraDeFerramentas={
        <FerramentasDaLista
          mostarInputBusca
          textoBusca={busca}
          aoMudarTextoBusca={(texto) =>
            setSearchParams({ busca: texto, pagina: '1' }, { replace: true })
          }
        />
      }
    >
      <Box padding={1}>
        <Accordion>
          <AccordionSummary
            expandIcon={<Icon>expand_more</Icon>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography color={theme.palette.primary.dark}>
              Sorvete Gourmet
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<Icon>expand_more</Icon>}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography color={theme.palette.primary.dark}>
              Sorvete Standart
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<Icon>expand_more</Icon>}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography color={theme.palette.primary.dark}>
              Sorvete Especial
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<Icon>expand_more</Icon>}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography color={theme.palette.primary.dark}>Açai</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              it amet, consectetur adipiscing elit. Suspendisse malesuada lacus
              ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<Icon>expand_more</Icon>}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography color={theme.palette.primary.dark}>Palito</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              it amet, consectetur adipiscing elit. Suspendisse malesuada lacus
              ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </LayoutBaseDePagina>
  );
};
