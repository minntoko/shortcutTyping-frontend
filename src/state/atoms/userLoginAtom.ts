import { atom } from "recoil";

export const loginState = atom<boolean>({
  key: "loginState",
  default: true,
});

export const loginToken = atom<string>({
  key: "logoinToken",
  default: "",
});