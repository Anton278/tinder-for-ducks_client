import { Message } from "models/Chat";

export type GetChatsRes = {
  users: string[];
  lastMessage: Message;
  unreadMessagesCount: number;
  id: string;
}[];
