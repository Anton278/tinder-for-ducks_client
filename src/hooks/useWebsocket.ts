import { useEffect, useRef } from "react";

import { useUser } from "stores/user";

const useWebsocket = () => {
  const {
    isLoading,
    user: { chats },
  } = useUser();
  const ws = useRef<WebSocket | undefined>();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    ws.current = new WebSocket(
      "ws://localhost:5000",
      `${localStorage.getItem("accessToken")}`
    );
    ws.current.onopen = (e) => {
      console.log("ws open ", e);
      if (!ws.current) {
        return;
      }

      ws.current.send(
        JSON.stringify({
          event: "subscribe",
          chatIds: chats,
        })
      );

      // @ts-ignore
      ws.current.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log("received message ", data);
      };
    };

    ws.current.onclose = (e) => {
      console.log("ws closed ", e);
    };

    const id = setInterval(() => {
      ws.current?.send(JSON.stringify({ event: "heartbeat", message: "ping" }));
    }, 25000);

    return () => {
      clearInterval(id);
      ws.current?.close();
    };
  }, [isLoading]);
};

export default useWebsocket;
