import { atom } from "recoil";
import { Space } from "../model/space";

export const spacesDictionaryAtom = atom<Record<string, Space> | undefined>({
  key: "spacesDictionaryAtom",
  default: undefined,
});
