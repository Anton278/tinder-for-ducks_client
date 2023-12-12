import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";

import App from "./App";
import { GlobalStyle } from "./globalStyle";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.min.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <ToastContainer />
    <App />
  </React.StrictMode>
);
