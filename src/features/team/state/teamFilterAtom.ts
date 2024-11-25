import { atom } from "recoil";

export interface TeamFilters {
  text: string;
}

export const teamFilterAtom = atom<TeamFilters>({
  key: "teamFilterAtom",
  default: { text: "" },
});
