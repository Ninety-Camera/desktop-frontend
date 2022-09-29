import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#6C63FF",
    },
    secondary: {
      main: "#2F2E41",
    },
    background: {
      default: "#ffffff",
    },
    text: {
      primary: "#000",
      secondary: "gray",
    },
  },
});

export default theme;
