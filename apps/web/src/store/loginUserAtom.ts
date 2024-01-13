import { atom } from 'jotai';
import LoginUserModel from "@model/LoginUserModel";
/** 로그인한 사용자입니다 */
const loginUserAtom = atom<LoginUserModel>( new LoginUserModel() );
export default loginUserAtom;