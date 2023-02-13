import { ListItemButton, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate, useResolvedPath } from 'react-router-dom';
import { useDebounce } from '../../shared/hooks';
import { LayoutBaseDePagina } from '../../shared/layouts';
import {
  AllTypes,
  SorveteProps,
} from '../../shared/services/api/sorvete/AllTypes';

export const TesteSorvete: React.FC = (to) => {
  const navigate = useNavigate();
  const resolvedPath = useResolvedPath(to);
  const pathName = resolvedPath.pathname.replace('/sorvete/', '');
  console.log(pathName);
  const handleClick = () => {
    navigate(to);
  };
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const { debounce } = useDebounce();
  const [rows, setRows] = useState<SorveteProps[]>([]);

  useEffect(() => {
    debounce(() => {
      AllTypes.getAll().then((result) => {
        if (result instanceof Error) {
          alert(result.message);
          return;
        } else {
          setRows(result.data);
        }
      });
    });
  }, []);
  console.log(rows);
  return (
    <LayoutBaseDePagina>
      <Box>
        <Box
          width={'100%'}
          height="250px"
          sx={{
            objectFit: 'cover',
          }}
          component="img"
          src="https://scontent.fsod2-1.fna.fbcdn.net/v/t1.6435-9/66519501_1254182294739876_5684698909167845376_n.png?_nc_cat=106&ccb=1-7&_nc_sid=e3f864&_nc_ohc=Lp9HcMhNDQkAX_wEcoE&tn=O3EcyzBfwA2FUv1M&_nc_ht=scontent.fsod2-1.fna&oh=00_AfDmDg7ile9A5fifYYhYM3LjWD09SJiF1qWDTXm9fpGJug&oe=6409A5F2"
        />
      </Box>

      <Box
        borderBottom={'1px solid'}
        width={'100%'}
        display={'flex'}
        flexDirection="row"
        justifyContent={'center'}
        alignItems="center"
        flexWrap={'wrap'}
        mt={mdDown ? 5 : 10}
        gap={mdDown ? 1 : 3}
      >
        <ListItemButton onClick={handleClick} />
      </Box>

      <Box>oi</Box>
    </LayoutBaseDePagina>
  );
};
