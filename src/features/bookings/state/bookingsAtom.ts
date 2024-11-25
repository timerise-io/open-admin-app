import { atom } from "recoil";
import { Booking } from "../model/booking";

export const bookingsAtom = atom<Record<string, Booking> | undefined>({
  key: "bookingsAtom",
  default: undefined,
});

export const bookingsArrayAtom = atom<Array<Booking> | undefined>({
  key: "bookingsArrayAtom",
  default: undefined,
});
