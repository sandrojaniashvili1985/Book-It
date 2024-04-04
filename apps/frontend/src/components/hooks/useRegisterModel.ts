
import { create } from "zustand";

interface RegisterModelStore {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useRegisterModel = create<RegisterModelStore>((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRegisterModel;
