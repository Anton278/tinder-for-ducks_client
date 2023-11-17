import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import { useAuth } from "./stores/auth";
import { useEffect } from "react";
import authService from "./services/auth";

function App() {
  const isAuthed = useAuth((state) => state.isAuthed);
  const setIsAuthed = useAuth((state) => state.setIsAuthed);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return;
    }
    async function refreshAccessToken() {
      try {
        const accessToken = await authService.refreshAccessToken();
        localStorage.setItem("accessToken", accessToken);
        setIsAuthed(true);
      } catch (err) {}
    }

    refreshAccessToken();
  }, []);

  const protectedRoutes = [
    {
      path: "/",
      element: <HomePage />,
    },
  ];
  const publicRoutes = [
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ];
  const routes = [
    {
      path: "*",
      element: <Navigate to={isAuthed ? "/" : "/login"} />,
    },
  ].concat(isAuthed ? protectedRoutes : publicRoutes);

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}

export default App;
