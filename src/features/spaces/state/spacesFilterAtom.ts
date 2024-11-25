import { textFilterAtom } from "helpers/state/textFilterAtom";
import { atom, selector } from "recoil";

export interface SpacesFilters {
  text: string;
}

export const spacesFilterAtom = atom<SpacesFilters>({
  key: "spacesFilterAtom",
  default: { text: "" },
});

export const spacesFilterSelector = selector({
  key: "spacesFilterSelector",
  get: ({ get }) => {
    const text = get(textFilterAtom("SPACES"));

    return { text };
  },
});
