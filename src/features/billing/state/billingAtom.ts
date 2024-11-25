import { atom } from "recoil";

export const billingAtom = atom<string | undefined>({
  key: "billingAtom",
  default: undefined,
});
