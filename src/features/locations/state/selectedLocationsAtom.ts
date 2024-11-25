import { atom } from "recoil";
import { Location } from "../model/location";

export const selectedLocationAtom = atom<Location | undefined>({
  key: "selectedLocationAtom",
  default: undefined,
});
