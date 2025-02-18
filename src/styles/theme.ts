import { createTheme } from '@mui/material/styles';

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
      400: '#CBCFD6',
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
    },
    h2: {
      fontSize: '1.85rem',
    },
    h3: {
      fontSize: '1.5rem',
    },
    h4: {
      fontSize: '1.2rem',
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 550,
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: 550,
      lineHeight: 1.35,
    },
    subtitle1: {
      fontSize: '0.875rem',
    },
    subtitle2: {
      fontSize: '0.75rem',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '0.875rem',
    },
    body2: {
      fontSize: '0.75rem',
    },
    button: {
      fontSize: '0.75rem',
    },
    caption: {
      fontSize: '0.75rem',
    },
    overline: {
      fontSize: '0.6rem',
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
    MuiFab: {
      styleOverrides: {
        sizeSmall: {
          width: 44,
          height: 44,
        },
      },
    },
  },
});
