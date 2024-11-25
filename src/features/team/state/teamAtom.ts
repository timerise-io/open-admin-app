import { atom } from "recoil";
import { User } from "../models/user";

export const teamAtom = atom<Record<string, User> | undefined>({
  key: "teamAtom",
  default: undefined,
});
