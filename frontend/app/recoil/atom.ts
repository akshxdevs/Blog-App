import { atom } from "recoil";

export const loginStateAtom = atom<boolean>({
  key: "loginState",
  default: false,    
});
