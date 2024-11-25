import { atom } from "recoil";
import { User } from "../models/user";

export const selectedTeamMemberAtom = atom<User | undefined>({
  key: "selectedTeamMemberAtom",
  default: undefined,
});
