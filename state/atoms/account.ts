import { atom } from "recoil";

const accountAtom = atom({
  key: "account",
  default: null,
});

export default accountAtom;
