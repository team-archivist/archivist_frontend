import { atom } from "jotai";

export type LinkModel = {
  linkId?: string;
  linkUrl?: string;
  linkName?: string;
  linkDesc?: string;
  imgUrl?: string;
  linkImgFile?: string;
  groupId?: string;
};

const LinkModalAtom = atom<LinkModel | undefined>(undefined);

export default LinkModalAtom;
