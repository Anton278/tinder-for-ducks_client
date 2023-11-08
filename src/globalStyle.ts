import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export const GlobalStyle = createGlobalStyle(({ theme }) => ({
  ...normalize,
  "html, body": {
    padding: 0,
    margin: 0,
    fontSize: 16,
  },
  "*": {
    boxSizing: "border-box",
  },
}));
