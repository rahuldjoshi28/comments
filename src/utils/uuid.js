import { getStorage, setStorage } from "./storage";

let uuid = getStorage("counter") || 0;


export function generateUUId() {
  uuid++;
  setStorage("counter", uuid);
  return uuid;
}
