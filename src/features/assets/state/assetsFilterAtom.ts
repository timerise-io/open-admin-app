import { textFilterAtom } from "helpers/state/textFilterAtom";
import { DefaultValue, atom, selector } from "recoil";

export interface AssetsBaseFilters {
  locationId?: string;
}

export type AssetsFilters = AssetsBaseFilters & {
  text: string;
};

export const assetsFilterAtom = atom<AssetsBaseFilters>({
  key: "assetsFilterAtom",
  default: {},
});

export const assetsFilterSelector = selector<AssetsFilters>({
  key: "assetsFilterSelector",
  get: ({ get }) => {
    const filters = get(assetsFilterAtom);
    const text = get(textFilterAtom("ASSETS"));

    return { ...filters, text };
  },
  set: ({ set, reset }, newValue) => {
    if (newValue instanceof DefaultValue) {
      reset(assetsFilterAtom);
      reset(textFilterAtom("ASSETS"));

      return;
    }

    set(assetsFilterAtom, {
      ...(newValue.locationId && { locationId: newValue.locationId }),
    });
    set(textFilterAtom("ASSETS"), newValue.text);
  },
});
