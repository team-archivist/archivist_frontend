import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {LoginView} from "@archivist/ui";
import USER_CONSTANTS from '@constants/userStorageConstants';
import axios from "axios";
import { useSetAtom } from "jotai";
import loginUserAtom from "@store/loginUserAtom";
import LoginUserModel from '@model/loginUserModel';
import { setCookie } from "cookies-next";

/** 카카오 로그인 관련 페이지입니다 */
const LoginPage = ( props ) => {
  const setLoginUser = useSetAtom( loginUserAtom );
  const router = useRouter();

  /** loginView 관련 로직입니다 */
  const [mountedByLoginView, setMountedByLoginView] = useState<boolean>(false);
  useEffect(() => {
    setMountedByLoginView(true);

    window.addEventListener("storage", onEndKakaoLogin);

    return () => {
      window.removeEventListener("storage", onEndKakaoLogin);
    };
  }, []);

  /** 로그인 버튼 클릭시 카카오 로그인창 오픈 */
  const onOpenKakaoLogin = async () => {
    const kakaoLoginURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_API_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_API_REDIRECT_URL}&response_type=code`;
    const popupWidth = 400;
    const popupHeight = 700;
    const popupX = window.innerWidth / 2 - popupWidth / 2;
    const popupY = window.innerHeight / 2 - popupHeight / 2;

    window.open(
      kakaoLoginURL,
      "_blank",
      `width=${popupWidth},height=${popupHeight},left=${popupX},top=${popupY}`
    );
  };

  /** 카카오 로그인이 완료되었을때 */
  const onEndKakaoLogin =  async (storageEvent: StorageEvent) => {
    let routerLink = "/";
    let removeStorageKey = '';  // storage 에서 제거할 key
    const isSignupUser =
      USER_CONSTANTS.STORAGE_SAVE_KEY.USER_ID === storageEvent.key;
    const isNotSignupUser =
      USER_CONSTANTS.STORAGE_SAVE_KEY.USER_EMAIL === storageEvent.key;
    let loginUserModel = new LoginUserModel();

    // 회원가입하지 않은 사용자일 경우
    if (isNotSignupUser) {
      loginUserModel.token = localStorage.getItem(
        USER_CONSTANTS.STORAGE_SAVE_KEY.USER_TOKEN
      );
      loginUserModel.email = localStorage.getItem(
        USER_CONSTANTS.STORAGE_SAVE_KEY.USER_EMAIL
      );
      routerLink = "/signup";
      removeStorageKey = USER_CONSTANTS.STORAGE_SAVE_KEY.USER_EMAIL;
    }
    // 회원가입한 사용자일 경우
    else if (isSignupUser) {
      loginUserModel.token = localStorage.getItem(
        USER_CONSTANTS.STORAGE_SAVE_KEY.USER_TOKEN
      );
      loginUserModel.userId = localStorage.getItem(
        USER_CONSTANTS.STORAGE_SAVE_KEY.USER_ID
      );
      routerLink = "/mycave";
      removeStorageKey = USER_CONSTANTS.STORAGE_SAVE_KEY.USER_ID;
      try {
        loginUserModel = await getLoginUserModel( loginUserModel );
      }
      catch ( e ){
        localStorage.removeItem(removeStorageKey);
        localStorage.removeItem(USER_CONSTANTS.STORAGE_SAVE_KEY.USER_TOKEN);
        router.push("/");
      }
    }
    else {
      return;
    }

    setLoginUser(loginUserModel);
    // NOTE: SSR을 위해 cookie 활용 필요함
    setCookie(USER_CONSTANTS.STORAGE_SAVE_KEY.USER_TOKEN,loginUserModel.token);
    localStorage.removeItem(removeStorageKey);
    localStorage.removeItem(USER_CONSTANTS.STORAGE_SAVE_KEY.USER_TOKEN);
    router.push(routerLink);
  };

  // 서버에서 loginUserModel 정보를 가져옵니다
  const getLoginUserModel = async ( loginUserModel : LoginUserModel ) : Promise<LoginUserModel> => {
    const AuthorizationToken = `Bearer ${loginUserModel.token}`;
    const res = await axios.get(`/api/user` , {
      headers : { Authorization: AuthorizationToken }
    } );
    if ( !res.data ){
      throw new Error( '잘못된 응답값입니다' );
    }
    return new LoginUserModel( { ...loginUserModel , ...res.data } );
  }

  return (
    <>
      {mountedByLoginView && (
        <LoginView
          onClickByLogin={onOpenKakaoLogin}
          onClickByClose={() => router.push("/")}
        />
      )}
    </>
  );
};
export default LoginPage;
