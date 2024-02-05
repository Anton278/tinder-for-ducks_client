import { RouterProvider } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

import authService from "./services/auth";
import { useUser } from "./stores/user";
import useWsConfig from "hooks/useWebsocket";
import useRouter from "hooks/useRouter";

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

  return <RouterProvider router={router} />;
}

export default App;
