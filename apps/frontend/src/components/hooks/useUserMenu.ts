import { create } from "zustand";

interface UserMenuModelStore {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useUserMenuModel = create<UserMenuModelStore>((set) => ({
  isOpen: false,
  onOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  onClose: () => set({ isOpen: false }),
}));

export default useUserMenuModel;
