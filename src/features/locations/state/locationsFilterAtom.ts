import { textFilterAtom } from "helpers/state/textFilterAtom";
import { atom, selector } from "recoil";

export interface LocationsFilters {
  text: string;
}

export const locationsFilterAtom = atom<LocationsFilters>({
  key: "locationsFilterAtom",
  default: { text: "" },
});

export const locationsFilterSelector = selector({
  key: "locationsFilterSelector",
  get: ({ get }) => {
    const text = get(textFilterAtom("LOCATIONS"));

    return { text };
  },
});
