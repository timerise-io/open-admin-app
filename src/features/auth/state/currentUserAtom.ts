import { atom } from "recoil";
import { CurrentUserAtom } from "../model/currentUser";

export const currentUserAtom = atom<CurrentUserAtom | undefined>({
  key: "currentUserAtom",
  default: undefined,
});
