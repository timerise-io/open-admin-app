import { selector } from "recoil";
import { assetsAtom } from "./assetsAtom";

export const assetArraySelector = selector({
  key: "assetArraySelector",
  get: ({ get }) => {
    const assets = get(assetsAtom);
    const assetsArray = Object.values(assets ?? {});
    return assetsArray.sort((assetA, assetB) => {
      return assetA.title.toLowerCase().localeCompare(assetB.title.toLowerCase());
    });
  },
});
