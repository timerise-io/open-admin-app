import { selector } from "recoil";
import { projectsAtom } from "./projectsAtom";
import { selectedProjectAtom } from "./selectedProjectAtom";

export const selectedProjectSelector = selector({
  key: "selectedProjectSelector",
  get: ({ get }) => {
    const projectId = get(selectedProjectAtom);
    if (!projectId) return;

    return get(projectsAtom)?.[projectId];
  },
});
