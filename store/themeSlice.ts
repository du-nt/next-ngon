import { StateCreator } from "zustand";

type Theme = "dark" | "light";

export type ThemeState = {
  theme: Theme;
  toggleTheme: (newTheme: Theme) => void;
};

const createThemeSlice: StateCreator<ThemeState> = (set) => ({
  theme: "light",
  toggleTheme: (newTheme) => set({ theme: newTheme }),
});

export default createThemeSlice;
