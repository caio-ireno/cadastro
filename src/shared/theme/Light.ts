import {createTheme} from '@mui/material';
import { blue,  orange } from '@mui/material/colors';

export const LightTheme = createTheme({
  palette:{
    primary:{
      main:blue[600],
      dark:blue[800],
      light:blue[400],
      contrastText:'#fff',
    },
    secondary:{
      main:orange[500],
      dark:orange[600],
      light:orange[300],
      contrastText:'#fff',
    },
    background:{
      default:'#f7f6f3',
      paper:'#fff',
    }
  },
  typography:{
    allVariants:{
      color: 'black'
    }
  }
});