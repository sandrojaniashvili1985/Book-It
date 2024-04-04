import { create } from "zustand";

interface MenuModelStore {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useMenuModel = create<MenuModelStore>((set) => ({
  isOpen: false,
  onOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  onClose: () => set({ isOpen: false }),
}));

export default useMenuModel;
