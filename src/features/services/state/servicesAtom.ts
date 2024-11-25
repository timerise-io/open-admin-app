import { atom } from "recoil";
import { Service } from "../model/service";

export const servicesAtom = atom<Record<string, Service> | undefined>({
  key: "servicesAtom",
  default: undefined,
});
