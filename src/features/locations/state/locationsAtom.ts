import { atom } from "recoil";
import { Location } from "../model/location";

export const locationsAtom = atom<Record<string, Location> | undefined>({
  key: "locationsAtom",
  default: undefined,
});
