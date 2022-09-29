import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#6C63FF", // #2F2E41
    },
    secondary: {
      main: "#F50057", //  #6C63FF
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
