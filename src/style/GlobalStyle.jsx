import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset}
    * {
        box-sizing: border-box;
        font-family: 'Spoqa Han Sans Neo', 'sans-serif';
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
