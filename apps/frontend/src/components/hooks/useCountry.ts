import { create } from "zustand";

interface useCountryStoreProp {
  country: string;
  setCountry: (country: string) => void;
}

export const useCountryStore = create<useCountryStoreProp>((set) => ({
  country: "",
  setCountry: (country) => {
    set((state) => ({
      country: (state.country = country),
    }));
  },
}));

export default useCountryStore;
