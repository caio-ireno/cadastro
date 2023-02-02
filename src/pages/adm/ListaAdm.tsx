import { Tabs, Tab, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { LojaAdm } from './LojaAdm';
import { SorveteAdm } from './SorveteAdm';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export const ListaAdm: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <LayoutBaseDePagina
      titulo="Adm"
      barraDeFerramentas={
        <Box
          marginTop={2}
          display="flex"
          alignItems={'center'}
          justifyContent="center"
        >
          <Tabs value={value} onChange={handleChange}>
            <Typography component={Tab} label="Sorvete" fontWeight={'500'} />
            <Typography component={Tab} label="Lojas" fontWeight={'500'} />
            <Typography component={Tab} label="Noticias" fontWeight={'500'} />
          </Tabs>
        </Box>
      }
    >
      <Box sx={{ width: '100%' }}>
        <TabPanel value={value} index={0}>
          <SorveteAdm />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <LojaAdm />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box>
    </LayoutBaseDePagina>
  );
};
