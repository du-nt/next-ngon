import { StateCreator } from "zustand";

export type UserState = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

const createUserSlice: StateCreator<UserState> = (set) => ({
  isAuthenticated: false,
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
});

export default createUserSlice;
