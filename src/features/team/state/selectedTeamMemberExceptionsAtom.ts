import { Slot } from "features/services/model/serviceSlotStrategie";
import { atom } from "recoil";

export const selectedTeamMemberExceptionsAtom = atom<Array<Slot>>({
  key: "selectedTeamMemberExceptionsAtom",
  default: [],
});
