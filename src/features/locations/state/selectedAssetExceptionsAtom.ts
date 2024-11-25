import { Slot } from "features/services/model/serviceSlotStrategie";
import { atom } from "recoil";

export const selectedLocationExceptionsAtom = atom<Array<Slot>>({
  key: "selectedLocationExceptionsAtom",
  default: [],
});
