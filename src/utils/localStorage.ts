export function setLocalStorage(key: string, value: string) {
  localStorage.setItem(key, value);
  return;
}

export function getLocalStorage(key: string) {
  const data = localStorage.getItem(key);

  return data!;
}

export function removeLocalStorage(key: string) {
  localStorage.removeItem(key);
  return;
}
