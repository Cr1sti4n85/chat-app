import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("thme") || "light",
  setTheme: (theme) => {
    localStorage.setItem("theme", theme);
    set({ theme });
  },
}));
