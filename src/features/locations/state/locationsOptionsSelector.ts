import { selector } from "recoil";
import { locationsDictionaryAtom } from "./locationsDictionaryAtom";

export const locationsOptionsSelector = selector({
  key: "locationsOptionsSelector",
  get: ({ get }) => {
    const locations = get(locationsDictionaryAtom) ?? {};

    const locationsOptions = Object.values(locations).reduce((acc, item) => {
      return { ...acc, [item.locationId]: item.title };
    }, {});

    return locationsOptions;
  },
});
