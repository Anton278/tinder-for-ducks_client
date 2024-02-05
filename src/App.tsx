import { RouterProvider } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

import authService from "./services/auth";
import { useUser } from "./stores/user";
import useWsConfig from "hooks/useWebsocket";
import useRouter from "hooks/useRouter";
import { JwtTokenPayload } from "models/JwtTokenPayload";
import usersService from "services/users";
import { User } from "models/User";

export const ws = new WebSocket(
  "ws://localhost:5000",
  `${localStorage.getItem("accessToken")}`
);

function App() {
  const router = useRouter();
  const { setUser } = useUser();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return;
    }

    async function getUser() {
      try {
        const accessToken = await authService.refreshAccessToken();
        const accessTokenPayload = jwtDecode<JwtTokenPayload>(accessToken);

        const user = (await usersService.getOne(
          accessTokenPayload.sub
        )) as User;
        setUser(user);
      } catch (err) {
        console.log(err);
      }
    }

    getUser();
  }, []);

  useWsConfig();

  return <RouterProvider router={router} />;
}

export default App;
