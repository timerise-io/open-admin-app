import { atom } from "recoil";
import { Service } from "../model/service";

export const selectedServiceAtom = atom<Service | undefined>({
  key: "selectedServiceAtom",
  default: undefined,
});
