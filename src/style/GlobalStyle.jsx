import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import SnappyLogoProfile from "asset/logo-profile-172213.png"
import { MAX_WIDTH } from "constant/style";

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    * {
      box-sizing: border-box;
    }
    @media (min-width: ${MAX_WIDTH}) {
      background: url(${SnappyLogoProfile}) 200px;
      ::before {
        content: "";
        position: absolute;
        z-index: -10;
        inset: 0;
        background-color: #ffffff70;
      }
    }
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  input,
  button {
    padding: 0;
    border: none;
    background: none;
    font-size: inherit;
    font: inherit;
  }
  button {
    cursor: pointer;
  }
  button:disabled {
    cursor: initial;
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
