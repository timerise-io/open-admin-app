import { atom } from "recoil";
import { Invitation } from "../models/invitation";

export const invitationsAtom = atom<Record<string, Invitation> | undefined>({
  key: "invitationsAtom",
  default: undefined,
});
