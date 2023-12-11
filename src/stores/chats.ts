import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { Chat } from "models/Chat";
import { SentMessage } from "models/responses/wsMessage";

type State = {
  areObserved: boolean;
  setAreObserved: (areObserved: boolean) => void;
  chats: {
    [chatId: string]: {
      chat: Chat;
      page: number;
      totalPages: number;
    };
  };
  setChat: (data: { chat: Chat; page: number; totalPages: number }) => void;
  addMessage: (sentMessage: SentMessage) => void;
};

export const useChats = create<State>()(
  devtools(
    (set, get) => ({
      areObserved: false,
      chats: {},

      setAreObserved: (areObserved) => {
        set({ areObserved });
      },
      setChat: (data) => {
        const chats = get().chats;
        const chat = chats[data.chat.id];
        if (!chat) {
          set({ chats: { ...chats, [data.chat.id]: { ...data } } });
          return;
        }
        const {
          page: oldPage,
          chat: { messages: oldMessages },
        } = chat;
        if (oldPage === data.page) {
          return;
        }
        set({
          chats: {
            ...chats,
            [data.chat.id]: {
              ...data,
              chat: {
                ...data.chat,
                messages: [...oldMessages, ...data.chat.messages],
              },
            },
          },
        });
      },
      addMessage: (sentMessage) => {
        const oldChats = get().chats;
        const oldChat = oldChats[sentMessage.chatId];
        set({
          chats: {
            ...oldChats,
            [sentMessage.chatId]: {
              ...oldChat,
              chat: {
                ...oldChat.chat,
                messages: [sentMessage.message, ...oldChat.chat.messages],
              },
            },
          },
        });
      },
    }),
    { store: "chats-store", name: "chats-store" }
  )
);

// export const selectChat
