import { selector } from "recoil";
import { spacesDictionaryAtom } from "./spacesDictionaryAtom";

export const spacesOptionsSelector = selector({
  key: "spacesOptionsSelector",
  get: ({ get }) => {
    const spaces = get(spacesDictionaryAtom) ?? {};

    const spacesOptions = Object.values(spaces).reduce((acc, item) => {
      return { ...acc, [item.spaceId]: item.title };
    }, {});

    return spacesOptions;
  },
});
