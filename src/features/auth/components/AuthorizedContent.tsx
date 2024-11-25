import React, { PropsWithChildren } from "react";
import { useRecoilValue } from "recoil";
import { authUserAtom } from "../state/authUserAtom";

export const AuthorizedContent: React.FC<PropsWithChildren> = ({ children }) => {
  const state = useRecoilValue(authUserAtom).state;

  if (state !== "logged") return null;

  return <>{children}</>;
};
