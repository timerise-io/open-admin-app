import { atom } from "recoil";
import { Slot } from "../model/serviceSlotStrategie";

export const selectedServiceExceptionsAtom = atom<Array<Slot>>({
  key: "selectedServiceExceptionsAtom",
  default: [],
});
