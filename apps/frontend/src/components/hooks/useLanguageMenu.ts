import { create } from "zustand";

interface LanguageModelStore {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useLanguageModel = create<LanguageModelStore>((set) => ({
  isOpen: false,
  onOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  onClose: () => set({ isOpen: false }),
}));

export default useLanguageModel;
