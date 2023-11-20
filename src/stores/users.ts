import { create } from "zustand";
import { devtools } from "zustand/middleware";

import usersService from "../services/users";
import { User } from "../models/User";

type State = {
  users: User[];
  isLoading: boolean;
  error: string;
  getUsers: () => Promise<void>;
};

export const useUsers = create<State>()(
  devtools((set) => ({
    users: [],
    isLoading: true,
    error: "",
    getUsers: async () => {
      try {
        const res = await usersService.getAll();
        set({ users: res, isLoading: false });
      } catch (err) {
        set({ isLoading: false, error: "Failed to get users" });
      }
    },
  }))
);
