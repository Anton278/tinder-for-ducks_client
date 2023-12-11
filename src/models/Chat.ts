export interface Message {
  authorId: string;
  message: string;
  id: string;
}

export interface Chat {
  messages: Message[];
  users: string[];
  id: string;
}
