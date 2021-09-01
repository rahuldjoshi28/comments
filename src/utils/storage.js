export function getStorage(key) {
  const item = localStorage.getItem(key);
  if (item === "undefined") return null;
  return JSON.parse(item);
}

export function setStorage(key, item) {
  localStorage.setItem(key, JSON.stringify(item));
}
