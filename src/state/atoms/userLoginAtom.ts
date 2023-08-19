import { atom } from "recoil";

export const loginState = atom({
  key: "loginState",
  default: true,
});

export const logoinToken = atom({
  key: "logoinToken",
  default: "",
});