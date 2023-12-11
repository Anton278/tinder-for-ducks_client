import { Chat, Message } from "models/Chat";

type SubscribeRes = {
  event: "subscribe";
  success: boolean;
  subscribedChats: string[];
};

type GetChatRes = {
  event: "get-chat";
  totalPages: number;
  page: number;
  chat: Chat;
};

export type SentMessage = {
  event: "sent-message";
  message: Message;
  chatId: string;
};

export type WsMessage = GetChatRes | SubscribeRes | SentMessage;
