import React from "react";
import ReactDOM from "react-dom/client";
import { GlobalStyle } from "./globalStyle";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { router } from "./router";
import { theme } from "./theme";

import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
