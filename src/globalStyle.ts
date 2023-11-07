import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export const GlobalStyle = createGlobalStyle({
  ...normalize,
  "html, body": {
    padding: 0,
    margin: 0,
    fontSize: 16,
  },
  body: {
    padding: "5px 15px",
  },
  "*": {
    boxSizing: "border-box",
  },
});
