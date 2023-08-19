import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({ //追加
	key: "recoil-persist",
	storage: sessionStorage
});

export const loginState = atom<boolean>({
  key: "loginState",
  default: false,
  effects_UNSTABLE: [persistAtom]
});

export const loginToken = atom<string>({
  key: "logoinToken",
  default: "",
  effects_UNSTABLE: [persistAtom]
});

export const userIdState = atom<string>({
  key: "userIdState",
  default: "",
  effects_UNSTABLE: [persistAtom]
});