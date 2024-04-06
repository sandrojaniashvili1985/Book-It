import { create } from "zustand";

interface useDatePikerProps {
  date: number;
  setDate: (date: number) => void;
  checkIn: string;
  setCheckIn: (checkIn: string) => void;
  checkOut: string;
  setCheckOut: (checkOut: string) => void;
}

export const useDatePiker = create<useDatePikerProps>((set) => ({
  date: 0,
  setDate: (date) => {
    set({ date });
  },
  checkIn: "",
  setCheckIn: (checkIn) => {
    set({ checkIn });
  },
  checkOut: "",
  setCheckOut: (checkOut) => {
    set({ checkOut });
  },
}));

export default useDatePiker;
