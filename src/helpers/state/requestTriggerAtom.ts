import { ListType } from "helpers/models/ListType";
import { atomFamily } from "recoil";

export const requestTriggerAtom = atomFamily<number, ListType | undefined>({
  key: "requestTriggerAtom",
  default: 0,
});
