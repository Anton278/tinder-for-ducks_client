import { ws } from "App";
import { useChats } from "stores/chats";
import { useUser } from "stores/user";

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

export const sendMessage = (chatId: string, message: string) => {
  if (ws.readyState !== ws.OPEN) {
    return;
  }
  if (!useChats.getState().areObserved) {
    return;
  }

  ws.send(
    JSON.stringify({
      event: "send-message",
      message: {
        authorId: useUser.getState().user.id,
        message,
      },
      chatId,
    })
  );
};
