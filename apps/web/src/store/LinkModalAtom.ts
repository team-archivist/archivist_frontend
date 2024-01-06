import { atom } from "jotai";

type LinkModel = {
  linkUrl?: string;
  linkName?: string;
  linkDesc?: string;
  imgUrl?: string;
  linkImgFile?: string;
};

const LinkModalAtom = atom<LinkModel | undefined>(undefined);

export default LinkModalAtom;
