import { ListType } from "helpers/models/ListType";
import { atomFamily } from "recoil";

export const textFilterAtom = atomFamily<string, ListType | undefined>({
  key: "textFilterAtom",
  default: "",
});
