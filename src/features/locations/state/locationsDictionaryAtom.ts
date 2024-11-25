import { atom } from "recoil";
import { Location } from "../model/location";

export const locationsDictionaryAtom = atom<Record<string, Location> | undefined>({
  key: "locationsDictionaryAtom",
  default: undefined,
});
