import { atomFamily } from "recoil";

interface ApiState {
  state?: "SUCCESS" | "ERROR";
  isLoading?: boolean;
}

export const apiStatusAtom = atomFamily<ApiState, string>({
  key: "apiStatusAtom",
  default: {},
});
