// import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from "jotai/utils";

import USER_CONSTANTS from "@arcave/constants/userStorageConstants";
import LoginUserModel from "@arcave/model/LoginUserModel";

const storage = createJSONStorage<LoginUserModel>(() => sessionStorage);
const loginUserAtom = atomWithStorage<LoginUserModel>(
  USER_CONSTANTS.STORAGE_SAVE_KEY.USER_INFO,
  new LoginUserModel(),
  storage,
);
export default loginUserAtom;
