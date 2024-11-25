import { atom } from "recoil";

export const topBarAtom = atom<number | undefined>({
  key: "topBarAtom",
  default: undefined,
});
