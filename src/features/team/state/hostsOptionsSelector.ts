import { selector } from "recoil";
import { teamDictionaryAtom } from "./teamDictionaryAtom";

export const hostsOptionsSelector = selector({
  key: "hostsOptionsSelector",
  get: ({ get }) => {
    const hosts = get(teamDictionaryAtom) ?? {};

    const hostsOptions = Object.values(hosts).reduce((acc, item) => {
      return { ...acc, [item.userId]: item.fullName };
    }, {});

    return hostsOptions;
  },
});
