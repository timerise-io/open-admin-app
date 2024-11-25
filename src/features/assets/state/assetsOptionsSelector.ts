import { selector } from "recoil";
import { assetsDictionaryAtom } from "./assetsDictionaryAtom";

export const assetsOptionsSelector = selector({
  key: "assetsOptionsSelector",
  get: ({ get }) => {
    const assets = get(assetsDictionaryAtom) ?? {};

    const assetsOptions = Object.values(assets).reduce((acc, item) => {
      return { ...acc, [item.assetId]: item.title };
    }, {});

    return assetsOptions;
  },
});
