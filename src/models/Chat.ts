export interface Message {
  authorId: string;
  message: string;
}

export interface Chat {
  messages: Message[];
  users: string[];
  id: string;
}
