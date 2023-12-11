import { ws } from "App";
import { useChats } from "stores/chats";

type Pagination = {
  mesagesPerPage?: number;
  page?: number;
};

export const getMessages = (chatId: string, pagination?: Pagination) => {
  if (ws.readyState !== ws.OPEN) {
    return;
  }
  if (!useChats.getState().areObserved) {
    return;
  }

  ws.send(
    JSON.stringify({
      event: "get-chat",
      chatId,
      ...pagination,
    })
  );
};
