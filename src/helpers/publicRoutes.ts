import { ROUTES } from "constans/routes";

export const PUBLIC_ROUTES = [ROUTES.signIn];

export const isRoutePublic = (pathname: string) => PUBLIC_ROUTES.includes(pathname);
