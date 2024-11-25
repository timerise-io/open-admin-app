import { atom } from "recoil";
import { Project } from "../model/project";

export const projectsAtom = atom<Record<string, Project> | undefined>({
  key: "projectsAtom",
  default: {},
});
