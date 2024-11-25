import { textFilterAtom } from "helpers/state/textFilterAtom";
import { DefaultValue, atom, selector } from "recoil";

export interface ServicesBaseFilters {
  spaceId?: string;
  locationId?: string;
  assetId?: string;
  hostId?: string;
  label?: string;
}

export type ServicesFilters = {
  text: string;
} & ServicesBaseFilters;

export const servicesFilterAtom = atom<ServicesBaseFilters>({
  key: "servicesFilterAtom",
  default: {},
});

export const servicesFilterSelector = selector<ServicesFilters>({
  key: "servicesFilterSelector",
  get: ({ get }) => {
    const filters = get(servicesFilterAtom);
    const text = get(textFilterAtom("SERVICES"));

    return { ...filters, text };
  },
  set: ({ set, reset }, newValue) => {
    if (newValue instanceof DefaultValue) {
      reset(servicesFilterAtom);
      reset(textFilterAtom("SERVICES"));

      return;
    }

    set(servicesFilterAtom, {
      ...(newValue.locationId && { locationId: newValue.locationId }),
      ...(newValue.assetId && { assetId: newValue.assetId }),
      ...(newValue.hostId && { hostId: newValue.hostId }),
      ...(newValue.label && { labelId: newValue.label }),
    });
    set(textFilterAtom("SERVICES"), newValue.text);
  },
});
