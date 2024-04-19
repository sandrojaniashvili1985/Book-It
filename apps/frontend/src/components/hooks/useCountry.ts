import { create } from "zustand";

interface useCountryStoreProp {
  country: string;
  setCity: (country: string) => void;
}

export const useCountryStore = create<useCountryStoreProp>((set) => ({
  country: "",
  setCity: (country) => {
    set((state) => ({
      country: (state.country = country),
    }));
  },
}));

export default useCountryStore;
