import { atom } from "recoil";

export type AuthUserAtom =
  | {
      state: "unknown" | "loggedOut";
    }
  | {
      state: "logged";
      user: {
        name: string;
        email: string;
        token: string;
      };
    };

export const authUserAtom = atom<AuthUserAtom>({
  key: "authUserAtom",
  default: { state: "unknown" },
});
