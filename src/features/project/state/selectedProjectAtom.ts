import { atom } from "recoil";

export const selectedProjectAtom = atom<string | undefined>({
  key: "selectedProjectAtom",
  default: localStorage.getItem("selectedProjectId") ?? undefined,
});
