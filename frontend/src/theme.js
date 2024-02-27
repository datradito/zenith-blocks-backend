import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#055FFC", // Replace with your primary color
      dark: "#880e4f", // Replace with a darker shade if needed
    },
    secondary: {
      main: "#055FFC", // Replace with your secondary color
      //   dark: "#c51162", // Replace with a darker shade if needed
      //   light: "#ff79b0", // Replace with a lighter shade if needed
    },
    error: {
      main: "#f44336", // Replace with your error color
    },
    warning: {
      main: "#ff9800", // Replace with your warning color
    },
    success: {
      main: "#4caf50", // Replace with your success color
    },
    info: {
      main: "#2196f3", // Replace with your info color
    },
    button: {
      primary: "#055FFC",
      secondary: "#282A2E",
    },
    action: {
      active: "#055FFC",
      hover: "rgba(98, 114, 164, 0.08)", // Fixed parsing error
      disabled: "#1A1C1E",
    },
    background: {
      default: "#1A1C1E", // Replace with your default background color
      paper: "#1A1C1E", // Replace with your paper background color
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#055FFC",
    },
  },
  typography: {
    fontFamily: "Satoshi", // Replace with your preferred font-family
    fontSize: "1rem", // Adjust the default font size
    fontWeightLight: 300,
    h1: {
      fontSize: "3rem", // Adjust the font size
      "@media (max-width:600px)": {
        fontSize: "2.5rem", // Adjust the font size for smaller screens
      },
      "@media (max-width:400px)": {
        fontSize: "2rem", // Adjust the font size for smaller screens
      },
    },
    h2: {
      fontSize: "2.5rem", // Adjust the font size
      "@media (max-width:600px)": {
        fontSize: "2rem", // Adjust the font size for smaller screens
      },
      "@media (max-width:400px)": {
        fontSize: "1.5rem", // Adjust the font size for smaller screens
      },
    },
    h3: {
      fontSize: "2rem", // Adjust the font size
      color: "#055FFC",
      "@media (max-width:600px)": {
        fontSize: "1.5rem", // Adjust the font size for smaller screens
      },
      "@media (max-width:400px)": {
        fontSize: "1.25rem", // Adjust the font size for smaller screens
      },
    },
    h4: {
      fontSize: "1.5rem", // Adjust the font size
    },
    h5: {
      fontSize: "1.25rem", // Adjust the font size
    },
    h6: {
      fontSize: "1rem", // Adjust the font size
    },
    body1: {
      fontSize: "1rem", // Adjust the font size
    },
    body2: {
      fontSize: "0.875rem", // Adjust the font size
    },
    subtitle1: {
      fontSize: "0.75rem", // Adjust the font size
      color: "rgba(255, 255, 255, 0.6)",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "45px",
        },
        contained: {
          "&.Mui-disabled": {
            backgroundColor: "rgb(25, 118, 210)",
            color: "rgba(0, 0, 0, 0.87)", // Changed to default MUI text color
          },
          "&:hover": {
            backgroundColor: "rgb(25, 118, 210)", // Changed to default MUI primary dark color
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
        },
      },
    },
    MuiStack: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          border: "2px solid rgba(40, 42, 46, 0.5)",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          width: "100%",
          padding: "0 0.5rem;",
          borderRadius: "5rem",
          border: "1px solid rgba(40, 42, 46, 0.5)",
          backgroundColor: "#24292E",
        },
        input: {
          padding: "0.5rem",
          color: "rgba(255, 255, 255, 0.87)",
        },
        "&.Mui-focused": {
          border: "none",
          backgroundColor: "#24292E",
        },
        "&.Mui-hover": {
          backgroundColor: "#24292E",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          width: "100%",
          borderRadius: "50px",
          border: "1px solid rgba(40, 42, 46, 0.5)",
          backgroundColor: "#24292E",
        },
        input: {
          padding: "0.5rem",
          color: "rgba(255, 255, 255, 0.87)",
        },
        "&.Mui-focused": {
          border: "none",
          backgroundColor: "#24292E",
        },
        "&.Mui-hover": {
          backgroundColor: "#24292E",
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;



