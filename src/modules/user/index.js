import { users } from "./data";
import { getStorage } from "../../utils/storage";

let currentUserName = getStorage("currentUser");
let currentUser = getUserDetails(currentUserName);

export function getUserDetails(userName) {
  return users.find((user) => user.userName === userName);
}

export function getUserNames() {
  return users.map((user) => user.userName);
}

export function getCurrentUser() {
  return currentUser;
}

export function getCurrentUserName() {
  return currentUserName;
}
