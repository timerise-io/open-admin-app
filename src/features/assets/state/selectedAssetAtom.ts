import { atom } from "recoil";
import { Asset } from "../models/asset";

export const selectedAssetAtom = atom<Asset | undefined>({
  key: "selectedAssetAtom",
  default: undefined,
});
