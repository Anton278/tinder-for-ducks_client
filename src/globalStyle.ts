import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle({
  "html, body": {
    padding: 0,
    margin: 0,
    fontSize: 16,
  },
  "*": {
    boxSizing: "border-box",
  },
});
