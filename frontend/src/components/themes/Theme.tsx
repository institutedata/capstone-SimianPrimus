import { createTheme, ThemeOptions } from '@mui/material/styles';

const commonThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: '"Amatic SC", cursive',
    fontWeightBold: 700,
    fontWeightMedium: 500,
    fontWeightRegular: 400,
    fontSize: 24,
    button: {
      textTransform: 'none',
      fontSize: '2rem',
      fontWeight: 700,
    },
    h1: {
      fontSize: '4rem',
    },
    h2: {
      fontSize: '3.5rem',
    },
    h3: {
      fontSize: '3rem',
    },
  },
  components: {
    // Define overrides for MUI components here
    MuiButton: {
      styleOverrides: {
        root: {
          // Button styles
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          // Snackbar styles
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          // ListItemButton styles
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          // Switch styles
        },
      },
    },
    // Add more component overrides if needed
  },
  // Add any additional global MUI customizations
};

export const lightTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: 'light',
    // Define the colors for your light theme
    primary: {
      main: '#feb1b3', // example primary color
    },
    secondary: {
      main: '#fdd9db', // example secondary color
    },
    background: {
      default: '#d9e7f4', // light theme background
      paper: '#bfbad9', // for components with a "paper" background, like Card
    },
    // You can also define other colors like error, warning, info, success
  },
  // Define additional overrides or custom styles specific to light theme if needed
});

export const darkTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: 'dark',
    // Define the colors for your dark theme
    primary: {
      main: '#90caf9', // example primary color for dark theme
    },
    secondary: {
      main: '#ffe082', // example secondary color for dark theme
    },
    background: {
      default: '#3a2b50', // dark theme background
      paper: '#254d70', // for components with a "paper" background, like Card
    },
    // You can also define other colors like error, warning, info, success
  },
  // Define additional overrides or custom styles specific to dark theme if needed
});

export default { lightTheme, darkTheme };