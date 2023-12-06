import { create } from "zustand";
import { devtools } from "zustand/middleware";

import authService from "../services/auth";
import { User } from "../models/User";
import usersService from "../services/users";

interface State {
  user: User;
  isAuthed: boolean;
  isLoading: boolean;

  logout: () => Promise<void>;
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
    isLoading: true,

    logout: async () => {
      try {
        await authService.logout();
        set({ isAuthed: false });
      } catch (err) {}
    },
    setUser: (user: User) => set({ user, isAuthed: true, isLoading: false }),
    updateUser: async (newUser) => {
      try {
        const updatedUser = await usersService.update(newUser);
        set({ user: updatedUser });
      } catch (err) {}
    },
  }))
);
