export interface Message {
  authorId: string;
  message: string;
  id: string;
  isRead: boolean;
}

export interface Chat {
  messages: Message[];
  users: string[];
  id: string;
}
