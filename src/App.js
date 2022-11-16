import { ThemeProvider } from "@mui/material/styles";
import Router from "./router";
import theme from "./utils/theme";
import Provider from "react-redux";

function App() {
  // const store = createStore(rootReducer);
  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
}

export default App;
