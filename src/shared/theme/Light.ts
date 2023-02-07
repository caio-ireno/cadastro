import {createTheme} from '@mui/material';
import { blue,  orange } from '@mui/material/colors';
import { Component } from 'react';

export const LightTheme = createTheme({
  palette:{
    primary:{
      main:blue[600],
      dark:blue[800],
      light:blue[400],
      contrastText:'#fff',
    },
    secondary:{
      main:orange[400],
      dark:orange[600],
      light:orange[300],
      contrastText:'#fff',
    },
    background:{
      default:'#fff',
      paper:'#fff',
    },
     
    
  },
  typography:{
    allVariants:{
      color: 'black',
      fontFamily: 'Philosopher',
    }
  },

  components:{
    MuiListItemButton:{
      styleOverrides:{
        selected:{
          backgroundColor:'#ffa726',
        },
        root:{
          
        }
      }
    },    
  }
      
});