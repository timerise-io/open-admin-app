import { atom } from "recoil";
import { Booking } from "../model/booking";

export const selectedBookingAtom = atom<Booking | undefined>({
  key: "selectedBookingAtom",
  default: undefined,
});
