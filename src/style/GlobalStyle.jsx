import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset}
    input,
    button {
        padding: 0;
        border: none;
        background: none;
        font-size: inherit;
        font-family: inherit;
    }
    button {
        cursor: pointer;
    }
    li {
        list-style: none;
    }

    .sr-only {
      position: absolute;
      overflow: hidden;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      border: 0;
      clip: rect(0,0,0,0);
  }
`;

export default GlobalStyle;
