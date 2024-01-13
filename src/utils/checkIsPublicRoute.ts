import { APP_ROUTES } from "./app_routes";

export function checkIsPublicRoute(asPath: string) {
  const appPublicsRoutes = Object.values(APP_ROUTES.public);

  return appPublicsRoutes.includes(asPath);
}
