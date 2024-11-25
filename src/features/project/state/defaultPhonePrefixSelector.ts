import { selector } from "recoil";
import { selectedProjectSelector } from "./selectedProjectSelector";

export const defaultPhonePrefixSelector = selector({
  key: "defaultPhonePrefixSelector",
  get: ({ get }) => {
    const serviceLang = get(selectedProjectSelector)?.defaultLocale;
    return serviceLang?.split("-")?.[1] ?? "PL";
  },
});
