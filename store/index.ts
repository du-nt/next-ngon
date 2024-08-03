import { create } from "zustand";
import createUserSlice, { UserState } from "./userSlice";
import createThemeSlice, { ThemeState } from "./themeSlice";

type BoundState = UserState & ThemeState;

const useBoundStore = create<BoundState>((...args) => ({
  ...createUserSlice(...args),
  ...createThemeSlice(...args),
}));

export default useBoundStore;
