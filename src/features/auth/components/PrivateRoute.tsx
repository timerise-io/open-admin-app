import React, { FC, PropsWithChildren } from "react";
import { ROUTES } from "constans/routes";
import { isRoutePublic } from "helpers/publicRoutes";
import { Navigate, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authUserAtom } from "../state/authUserAtom";

export const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
  const authUser = useRecoilValue(authUserAtom);
  const location = useLocation();

  const isPublic = location.pathname ? isRoutePublic(location.pathname) : false;

  if (isPublic || authUser.state === "logged") {
    return <>{children}</>;
  }

  return <Navigate to={ROUTES.signIn} state={{ from: location }} replace />;
};
