import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef } from "react";

import HomePage from "./pages/Home";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import LikedPage from "./pages/Liked";
import MatchsPage from "./pages/Matchs";
import usersService from "./services/users";
import NotificationsPage from "./pages/Notifications";
import ChatsPage from "./pages/Chats";
import ChatPage from "./pages/Chat";
import SettingsPage from "./pages/Settings";

import authService from "./services/auth";
import { useUser } from "./stores/user";
import useWsConfig from "hooks/useWebsocket";

export const ws = new WebSocket(
  "ws://localhost:5000",
  `${localStorage.getItem("accessToken")}`
);

function App() {
  const {
    isAuthed,
    isLoading,
    setUser,
    user: { id, chats },
  } = useUser();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return;
    }

    async function init() {
      try {
        const accessToken = await authService.refreshAccessToken();
        const accessTokenPayload = jwtDecode<any>(accessToken);
        setUser(accessTokenPayload.user);
      } catch (err) {
        console.log(err);
      }
    }

    init();
  }, []);

  useWsConfig();

  // useEffect(() => {
  //   if (!isAuthed) {
  //     return;
  //   }
  //   const getNewMatches = async () => {
  //     try {
  //       const users = await usersService.getAll();
  //       const user = users.find((user) => user.id === uid);
  //       if (!user) {
  //         return console.error("Unexpected error: can not find user");
  //       }
  //       const matchs = users.filter((candidate) => {
  //         if (candidate.id === uid) {
  //           return false;
  //         }
  //         if (
  //           candidate.liked.includes(uid) &&
  //           user.liked.includes(candidate.id)
  //         ) {
  //           return true;
  //         }
  //         return false;
  //       });

  //       const newMatchs = matchs.filter(
  //         (match) => !user.matchs.includes(match.id)
  //       );

  //       if (!newMatchs.length) {
  //         return;
  //       }
  //       await updateUser({
  //         ...user,
  //         newMatchs: newMatchs.map((user) => user.id),
  //         notifications: {
  //           ...user.notifications,
  //           new: [
  //             newMatchs.length === 1
  //               ? { type: "newMatch" }
  //               : { type: "newMatchs", count: newMatchs.length },
  //           ],
  //         },
  //       });
  //     } catch (err) {}
  //   };

  //   // const id = setInterval(() => getNewMatches(), 15000);

  //   return () => {
  //     // clearInterval(id);
  //   };
  // }, [isAuthed]);

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
