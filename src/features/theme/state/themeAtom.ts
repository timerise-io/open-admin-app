import { atom } from "recoil";
import { ThemeType } from "../model";

export const themeAtom = atom<ThemeType>({
  key: "themeAtom",
  default: "LIGHT",
});
