import { api } from "../http/api";
import { Chat } from "../models/Chat";

class ChatsService {
  async create(users: string[]): Promise<Chat> {
    const createdChat = await api.post("/chats", { users });
    return createdChat.data;
  }

  async getAll(): Promise<Chat[]> {
    const res = await api.get("/chats");
    return res.data;
  }
}

const chatsService = new ChatsService();

export default chatsService;
