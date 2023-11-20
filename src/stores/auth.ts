import { create } from "zustand";
import { devtools } from "zustand/middleware";

import authService from "../services/auth";

type State = {
  isAuthed: boolean;
  setIsAuthed: (isAuthed: boolean) => void;
  logout: () => Promise<void>;
};

export const useAuth = create<State>()(
  devtools((set) => ({
    isAuthed: false,
    setIsAuthed: (isAuthed: boolean) => set({ isAuthed }),
    logout: async () => {
      try {
        await authService.logout();
        set({ isAuthed: false });
      } catch (err) {}
    },
  }))
);
