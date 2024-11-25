import { selector } from "recoil";
import { authUserAtom } from "./authUserAtom";

export const tokenSelector = selector({
  key: "tokenSelector",
  get: ({ get }) => {
    const authUser = get(authUserAtom);
    if (authUser.state === "logged") {
      return authUser.user.token;
    }
    return;
  },
});
