import { atom } from "recoil";
import { Space } from "../model/space";

export const selectedSpaceAtom = atom<Space | undefined>({
  key: "selectedSpaceAtom",
  default: undefined,
});
