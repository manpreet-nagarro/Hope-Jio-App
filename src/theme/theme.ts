import { FONTS } from '@constants/theme.constants';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: FONTS.FONT_FAMILY,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: FONTS.FONT_FAMILY,
        },
      },
    },
    MuiTypography:{
      styleOverrides:{
        root:{
          fontFamily: FONTS.FONT_FAMILY,
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily: FONTS.FONT_FAMILY,
        },
        startIcon: {
          marginLeft: '0px',
        },
        endIcon:{
            marginRight: '0px',
        }
      },
    },
  },
});

export default theme;
