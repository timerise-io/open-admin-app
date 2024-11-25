import { CurrentUserAtom } from "features/auth/model/currentUser";

export interface CurrentUserResult {
  me: CurrentUserAtom;
}

export interface CurrentUserVariables {
  projectId: string;
}
