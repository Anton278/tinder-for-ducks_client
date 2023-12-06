import { Message } from "models/Chat";

export interface GetChatRes {
  event: "get-messages";
  totalPages: number;
  messages: Message[];
}
