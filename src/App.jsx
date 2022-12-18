import styled, { ThemeProvider } from "styled-components";

import AppRouter from "page/Router";
import GlobalStyle from "style/GlobalStyle";

import { MAX_WIDTH } from "constant/style";

import "style/font.css";
import theme from "style/theme";

const Wrapper = styled.div`
  width: min(${MAX_WIDTH}, calc(100% - 30px));
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
