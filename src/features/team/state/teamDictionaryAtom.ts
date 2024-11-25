import { atom } from "recoil";
import { User } from "../models/user";

export const teamDictionaryAtom = atom<Record<string, User> | undefined>({
  key: "teamDictionaryAtom",
  default: undefined,
});
