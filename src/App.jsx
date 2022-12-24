import { ThemeProvider } from "styled-components";

import AppRouter from "page/Router";
import GlobalStyle from "style/GlobalStyle";

import theme from "style/theme";
import "style/font.css";


function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </>
  );
}

export default App;
