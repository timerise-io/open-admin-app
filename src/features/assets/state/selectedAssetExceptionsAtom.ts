import { Slot } from "features/services/model/serviceSlotStrategie";
import { atom } from "recoil";

export const selectedAssetsExceptionsAtom = atom<Array<Slot>>({
  key: "selectedAssetsExceptionsAtom",
  default: [],
});
