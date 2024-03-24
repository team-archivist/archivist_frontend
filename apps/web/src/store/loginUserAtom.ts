// import { atom } from 'jotai';
import {atomWithStorage , createJSONStorage } from "jotai/utils";
import {AsyncStorage} from "jotai/vanilla/utils/atomWithStorage";
import LoginUserModel from "@model/LoginUserModel";
import USER_CONSTANTS from "@constants/userStorageConstants";

/**
 * - loginUser 정보는 sessionStorage 에 저장합니다
 *   ( 기본값은 Localstorage 이며, 현재 저장되는 저장소는 SessionStorage 로 변경하였습니다 )
 * --> https://jotai.org/docs/guides/persistence
 */
const storage = createJSONStorage<LoginUserModel>(() => sessionStorage) as AsyncStorage<LoginUserModel>;
const loginUserAtom = atomWithStorage<LoginUserModel>(USER_CONSTANTS.STORAGE_SAVE_KEY.USER_INFO, new LoginUserModel() , storage );
export default loginUserAtom;