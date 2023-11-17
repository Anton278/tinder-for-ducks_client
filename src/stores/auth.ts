import { create } from "zustand";
import { devtools } from "zustand/middleware";

type State = {
  isAuthed: boolean;
  setIsAuthed: (isAuthed: boolean) => void;
};

export const useAuth = create<State>()(
  devtools((set) => ({
    isAuthed: false,
    setIsAuthed: (isAuthed: boolean) => set({ isAuthed }),
  }))
);
