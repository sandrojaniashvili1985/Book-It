import { create } from "zustand";

interface UseAuthStoreProp {
  isLoggedIn: boolean;
  user: UserProp | null;
  login: (res) => void;
  logout: () => void;
  setUser: (user: object | null) => void;
  getUser: () => void;
}

interface UserProp {
  id: string;
  email: string;
  username: string;
}

export const useAuthStore = create<UseAuthStoreProp>((set) => ({
  isLoggedIn: false,
  user: null,
  login: (res) => {
    localStorage.setItem("user", JSON.stringify(res?.data));
    set((state) => ({
      isLoggedIn: (state.isLoggedIn = true),
    }));
  },
  logout: () => {
    localStorage.removeItem("user");
    set((state) => ({
      isLoggedIn: (state.isLoggedIn = false),
    }));
  },
  setUser: (user: UserProp) => {
    localStorage.setItem("user", JSON.stringify(user));
    set((state) => ({
      ...state,
      user,
    }));
  },
  getUser: () => {
    const user = localStorage.getItem("user");
    if (user) {
      set((state) => ({
        user: (state.user = JSON.parse(user)),
        isLoggedIn: (state.isLoggedIn = true),
      }));
    }
  },
}));
