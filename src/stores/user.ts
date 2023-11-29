import { create } from "zustand";
import { devtools } from "zustand/middleware";

import authService from "../services/auth";
import { User } from "../models/User";
import usersService from "../services/users";

interface State {
  user: User;
  isAuthed: boolean;

  logout: () => Promise<void>;
  getUser: (id: string) => Promise<void>;
  setUser: (user: User) => void;
  updateUser: (user: User) => Promise<void>;
}

export const useUser = create<State>()(
  devtools((set, get) => ({
    user: {
      username: "",
      duck: {
        description: "",
        images: [],
      },
      id: "",
      liked: [],
      disliked: [],
      matchs: [],
      newMatchs: [],
      notifications: { old: [], new: [] },
      chats: [],
    },
    isAuthed: !!localStorage.getItem("accessToken"),

    logout: async () => {
      try {
        await authService.logout();
        set({ isAuthed: false });
      } catch (err) {}
    },
    getUser: async (id: string) => {
      try {
        const user = await usersService.getOne(id);
        set({ user, isAuthed: true });
      } catch (err) {}
    },
    setUser: (user: User) => set({ user, isAuthed: true }),
    updateUser: async (newUser) => {
      try {
        const updatedUser = await usersService.update(newUser);
        set({ user: updatedUser });
      } catch (err) {}
    },
  }))
);
