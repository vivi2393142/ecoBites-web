import { createTheme } from '@mui/material/styles';
import type {} from '@mui/x-data-grid/themeAugmentation';
import type {} from '@mui/x-date-pickers/themeAugmentation';

// TODO: adjust theme
export const theme = createTheme({
  palette: {
    primary: {
      main: '#79AE7A',
      contrastText: '#FFF',
    },
    secondary: {
      main: '#FDA86D',
      contrastText: '#FFF',
    },
    background: {
      default: '#FFF',
      container: '#F1F2F4',
    },
    text: {
      primary: '#5D5F5E', // darkGrey
      secondary: '#828282',
      disabled: '#E0E0E0',
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEE',
      300: '#E0E0E0',
      400: '#CBCFD6', // lightGrey
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },
  typography: {
    h1: {
      fontSize: '2.3rem',
      // fontWeight: 300,
      // fontSize: '6rem',
      // lineHeight: 1.167,
      // letterSpacing: '-0.01562em',
    },
    h2: {
      fontSize: '1.85rem',
      // fontWeight: 300,
      // fontSize: '3.75rem',
      // lineHeight: 1.2,
      // letterSpacing: '-0.00833em',
    },
    h3: {
      fontSize: '1.5rem',
      // fontWeight: 400,
      // fontSize: '3rem',
      // lineHeight: 1.167,
      // letterSpacing: '0em',
    },
    h4: {
      fontSize: '1.2rem',
      // fontWeight: 400,
      // fontSize: '2.125rem',
      // lineHeight: 1.235,
      // letterSpacing: '0.00735em',
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 500,
      // fontSize: '1.5rem',
      // lineHeight: 1.334,
      // letterSpacing: '0em',
    },
    h6: {
      fontSize: '0.9rem',
      // fontWeight: 500,
      // fontSize: '1.25rem',
      lineHeight: 1.35,
      // letterSpacing: '0.0075em',
    },
    subtitle1: {
      fontSize: '0.875rem',
      // fontWeight: 400,
      // fontSize: '1rem',
      // lineHeight: 1.75,
      // letterSpacing: '0.00938em',
    },
    subtitle2: {
      fontSize: '0.75rem',
      // fontWeight: 500,
      // fontSize: '0.875rem',
      lineHeight: 1.4,
      // letterSpacing: '0.00714em',
    },
    body1: {
      fontSize: '0.875rem',
      // fontWeight: 400,
      // fontSize: '1rem',
      // lineHeight: 1.5,
      // letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: '0.75rem',
      // fontWeight: 400,
      // fontSize: '0.875rem',
      // lineHeight: 1.43,
      // letterSpacing: '0.01071em',
    },
    button: {
      fontSize: '0.75rem',
      // fontWeight: 500,
      // fontSize: '0.875rem',
      // lineHeight: 1.75,
      // letterSpacing: '0.02857em',
      // textTransform: 'uppercase',
    },
    caption: {
      fontSize: '0.75rem',
      // fontWeight: 400,
      // fontSize: '0.75rem',
      // lineHeight: 1.66,
      // letterSpacing: '0.03333em',
    },
    overline: {
      fontSize: '0.6rem',
      // fontWeight: 400,
      // fontSize: '0.75rem',
      // lineHeight: 2.66,
      // letterSpacing: '0.08333em',
      // textTransform: 'uppercase',
    },
  },
  components: {
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          '&:hover': {
            color: '#79AE7A',
            opacity: 0.8,
          },
          '&:hover > svg': {
            transform: 'scale(1.2)',
            transition: 'all 0.1s ease',
          },
        },
      },
    },
    MuiSvgIcon: {
      variants: [
        {
          props: {
            fontSize: 'tiny',
          },
          style: {
            fontSize: '0.75rem',
          },
        },
      ],
      styleOverrides: {
        fontSizeSmall: {
          fontSize: '1rem',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          '&:last-child': {
            paddingBottom: 16,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        labelSmall: {
          fontSize: '0.7rem',
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          bottom: 72,
        },
      },
    },
  },
});
