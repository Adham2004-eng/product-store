import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FF3C38",
    },
    background: {
      default: "#000",
      paper: "#111",
    },
    text: {
      primary: "#fff",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

export default theme;
