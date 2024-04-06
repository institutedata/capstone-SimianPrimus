import { createTheme, ThemeOptions } from "@mui/material/styles";
import {
  LightStyles,
  DarkStyles,
  LightButton,
  DarkButton,
} from "./ThemeStyles";

const commonThemeOptions: ThemeOptions = {
  components: {
    // Add additional component overrides
  },
  // Add global MUI customizations
};

// Define a function to create a theme with different gradients based on the mode
const createCustomTheme = (mode: "light" | "dark") => {
  const gradient =
    mode === "light"
      ? "linear-gradient(180deg, #99d9f9 30%, #d9e7f4 )"
      : "linear-gradient(180deg, #254d70 30%, #080b38 )";

  return createTheme({
    ...commonThemeOptions,
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: { main: "#bfbad9" },
            secondary: { main: "#feb1b3" },
            tertiary: { main: "#3a2b50" },
            background: { default: "#d9e7f4", paper: "#bfbad9" },
          }
        : {
            primary: { main: "#382b50" },
            secondary: { main: "#161638" },
            tertiary: { main: "#bfbad9" },
            background: { default: "#080b38", paper: "#254d70" },
          }),
    },
    typography: {
      fontFamily: '"Amatic SC", cursive',
      fontWeightBold: 700,
      fontWeightMedium: 500,
      fontWeightRegular: 400,
      fontSize: 28,
      h1: {
        fontSize: "4rem",
        color: mode === "light" ? "#3a2b50" : "#bfbad9",
        textAlign: "center",
        fontWeight: 700,
      },
      h2: {
        fontSize: "3.5rem",
        color: mode === "light" ? "#3a2b50" : "#bfbad9",
        textAlign: "center",
        fontWeight: 700,
      },
      h3: {
        fontSize: "3rem",
        color: mode === "light" ? "#3a2b50" : "#bfbad9",
        textAlign: "center",
        fontWeight: 700,
      },
      h4: {
        fontSize: "2.5rem",
        color: mode === "light" ? "#3a2b50" : "#bfbad9",
        textAlign: "center",
        fontWeight: 600,
      },
      h5: {
        fontSize: "2rem",
        color: mode === "light" ? "#3a2b50" : "#bfbad9",
        textAlign: "center",
        fontWeight: 600,
      },
      h6: {
        fontSize: "1.5rem",
        color: mode === "light" ? "#3a2b50" : "#bfbad9",
        textAlign: "center",
        fontWeight: 600,
      },
      body1: {
        fontSize: "2rem",
        color: mode === "light" ? "#3a2b50" : "#bfbad9",
        textAlign: "center",
        fontWeight: 600,
      },
      body2: {
        fontSize: "1.5rem",
        color: mode === "light" ? "#3a2b50" : "#bfbad9",
        textAlign: "center",
        fontWeight: 600,
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: gradient,
            padding: 20,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            ...(mode === "light" ? LightStyles : DarkStyles),
            color: mode === "light" ? "#3a2b50" : "#bfbad9",
            padding: 20,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            margin: "10px",
            ...(mode === "light" ? LightButton : DarkButton),
            color: mode === "light" ? "#3a2b50" : "#bfbad9",
            minWidth: 120,
            fontWeight: 600,
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px 20px",
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            padding: 10,
            color: mode === "light" ? "#3a2b50" : "#bfbad9",
          },
        },
      },
      MuiSnackbar: {
        styleOverrides: {
          root: {
            margin: "8px",
            ...(mode === "light" ? LightStyles : DarkStyles),
            color: mode === "light" ? "#3a2b50" : "#bfbad9",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            color: mode === "light" ? "#3a2b50" : "#bfbad9",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
            color: mode === "light" ? "#3a2b50" : "#bfbad9",
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
      MuiLink: {
        styleOverrides: {
          root: {
            textAlign: "center",
            color: mode === "light" ? "#3a2b50" : "#bfbad9",
            fontSize: "2rem",
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {},
        },
      },
      MuiModal: {
        styleOverrides: {
          root: {
            background: gradient,
            padding: 20,
            borderRadius: 10,
          },
        },
      },
    },
  });
};

export const lightTheme = createCustomTheme("light");
export const darkTheme = createCustomTheme("dark");
