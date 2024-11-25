import { atom } from "recoil";
import { Asset } from "../models/asset";

export const assetsAtom = atom<Record<string, Asset> | undefined>({
  key: "assetsAtom",
  default: undefined,
});
