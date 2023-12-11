import { useEffect } from "react";

import { ws } from "App";
import { useUser } from "stores/user";
import { useChats } from "stores/chats";
import { WsMessage } from "models/responses/wsMessage";

const useWsConfig = () => {
  const {
    isLoading,
    user: { chats },
  } = useUser();
  const setAreChatsObserved = useChats((state) => state.setAreObserved);
  const setChat = useChats((state) => state.setChat);
  const addMessage = useChats((state) => state.addMessage);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    ws.onclose = (e) => {
      console.log("ws closed ", e);
    };

    if (ws.readyState !== ws.OPEN) {
      return;
    }

    ws.send(
      JSON.stringify({
        event: "subscribe",
        chatIds: chats,
      })
    );

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data) as WsMessage;
      console.log("received message ", data);

      if (data.event === "subscribe") {
        setAreChatsObserved(true);
        return;
      }
      if (data.event === "get-chat") {
        // @ts-ignore
        delete data.event;
        setChat(data);
        return;
      }
      if (data.event === "sent-message") {
        addMessage(data);
      }
    };

    const id = setInterval(() => {
      ws.send(JSON.stringify({ event: "heartbeat", message: "ping" }));
    }, 25000);

    return () => {
      clearInterval(id);
      ws.close();
    };
  }, [isLoading, ws.readyState]);
};

export default useWsConfig;
