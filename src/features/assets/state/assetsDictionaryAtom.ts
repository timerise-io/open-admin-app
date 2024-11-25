import { atom } from "recoil";
import { Asset } from "../models/asset";

export const assetsDictionaryAtom = atom<Record<string, Asset> | undefined>({
  key: "assetsDictionaryAtom",
  default: undefined,
});
