import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "./pages/Register";
import App from "./App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);
