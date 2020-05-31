import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  
  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  html {
    font-size: 62.5%; 
  }
  
  body {
    overflow-x: hidden;
    overflow-y: scroll;
    font-size: 1.6rem;
    font-family: "Roboto", sans-serif;
    padding: 0;
    margin: 0;
    background-color: #f4f6f8;

  }

  a {
  text-decoration: none;
}
`;

export default GlobalStyle;
