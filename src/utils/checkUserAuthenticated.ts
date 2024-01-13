import { getLocalStorage } from "./localStorage";

export function checkUserAuthenticated() {
  const userToken = getLocalStorage("token");

  return !!userToken;
}
