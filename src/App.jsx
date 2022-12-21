import styled, { ThemeProvider } from "styled-components";

import AppRouter from "page/Router";
import GlobalStyle from "style/GlobalStyle";

import theme from "style/theme";
import "style/font.css";
import { MAX_WIDTH, MIN_WIDTH } from "constant/style";

const Wrapper = styled.div`
  width: min(${MAX_WIDTH}, 100%);
   min-width: ${MIN_WIDTH};
  margin: 0 auto;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

function App() {
  return <Wrapper>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  </Wrapper>;
}

export default App;
