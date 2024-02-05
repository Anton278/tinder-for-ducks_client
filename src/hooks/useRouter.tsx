import { Navigate, createBrowserRouter } from "react-router-dom";

import HomePage from "pages/Home";
import RegisterPage from "pages/Register";
import LoginPage from "pages/Login";
// import LikedPage from "pages/Liked";
import MatchsPage from "pages/Matchs";
import NotificationsPage from "pages/Notifications";
import ChatsPage from "pages/Chats";
import ChatPage from "pages/Chat";
import SettingsPage from "pages/Settings";
import { useUser } from "stores/user";

const protectedRoutes = [
  {
    path: "/",
    element: <HomePage />,
  },
  // {
  //   path: "/liked",
  //   element: <LikedPage />,
  // },
  {
    path: "/matchs",
    element: <MatchsPage />,
  },
  {
    path: "/notifications",
    element: <NotificationsPage />,
  },
  {
    path: "/chats",
    element: <ChatsPage />,
  },
  {
    path: "/chats/:id",
    element: <ChatPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
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

export default function useRouter() {
  const isAuthed = useUser((state) => state.isAuthed);

  const routes = [
    {
      path: "*",
      element: <Navigate to={isAuthed ? "/" : "/login"} />,
    },
  ].concat(isAuthed ? protectedRoutes : publicRoutes);
  const router = createBrowserRouter(routes);
  return router;
}
