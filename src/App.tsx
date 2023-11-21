import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import authService from "./services/auth";
import { useUser } from "./stores/user";
import LikedPage from "./pages/Liked";

function App() {
  const isAuthed = useUser((state) => state.isAuthed);
  const getUser = useUser((state) => state.getUser);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return;
    }

    async function init() {
      try {
        const accessToken = await authService.refreshAccessToken();
        const accessTokenPayload = jwtDecode<any>(accessToken);
        const uid: string = accessTokenPayload.user.user.id;
        await getUser(uid);
      } catch (err) {}
    }

    init();
  }, []);

  const protectedRoutes = [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/liked",
      element: <LikedPage />,
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
