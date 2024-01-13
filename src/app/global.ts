import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: white;

    font-size: 16px;

    color: #3F3F55;
  }
`;

export default GlobalStyle;
