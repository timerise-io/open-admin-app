import { atom } from "recoil";
import { Service } from "../model/service";

export const servicesDictionaryAtom = atom<Record<string, Service> | undefined>({
  key: "servicesDictionaryAtom",
  default: undefined,
});
