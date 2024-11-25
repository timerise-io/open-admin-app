import { atom } from "recoil";
import { Space } from "../model/space";

export const spacesAtom = atom<Record<string, Space> | undefined>({
  key: "spacesAtom",
  default: undefined,
});
