import { getCookie } from "cookies-next";
import { useAtom } from "jotai/index";
import { useRouter } from "next/router";
import { useEffect } from "react";

import USER_CONSTANTS from "@arcave/constants/userStorageConstants";
import LoginUserModel from "@arcave/model/LoginUserModel";
import loginUserAtom from "@arcave/store/loginUserAtom";

enum RouteLink {
  SIGNUP = "/signup",
  MYCAVE = "/mycave",
}

/**
 * - KakaoLogin 관련 기능을 제공해주는 Hook 입니다
 */
const useKakaoLogin = () => {
  // FIXME : _loginUser 정보를 mutable하게 다루는 로직 변경 필요.
  const [loginUser, setLoginUser] = useAtom(loginUserAtom);
  const router = useRouter();

  useEffect(() => {
    window.addEventListener("message", onEndKakaoLogin);
    return () => {
      window.removeEventListener("message", onEndKakaoLogin);
    };
  }, []);

  /** 해당 유저가 이미 로그인 되어있는지 여부를 반환합니다 */
  const isLogin = () => {
    const token = getCookie(USER_CONSTANTS.STORAGE_SAVE_KEY.USER_TOKEN);
    return !!(token && loginUser && loginUser.userId);
  };

  /** 로그인 버튼 클릭시 카카오 로그인창 오픈 */
  const onLogin = async () => {
    if (isLogin()) {
      router.push(RouteLink.MYCAVE);
      return;
    }

    const kakaoLoginURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_API_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_API_REDIRECT_URL}&response_type=code`;
    const popupWidth = 400;
    const popupHeight = 700;
    const popupX = window.innerWidth / 2 - popupWidth / 2;
    const popupY = window.innerHeight / 2 - popupHeight / 2;

    window.open(
      kakaoLoginURL,
      "_blank",
      `width=${popupWidth},height=${popupHeight},left=${popupX},top=${popupY}`,
    );
  };

  /** 카카오 로그인이 완료되었을때 */
  const onEndKakaoLogin = (event) => {
    if (event.data.code === "failed") {
      alert("문제가 발생하였습니다. 다시 시도해주세요.");
      router.push("/");
      return;
    }

    let routerLink = "/";
    const _loginUser = new LoginUserModel(loginUser);

    const isSignupUser =
      USER_CONSTANTS.STORAGE_SAVE_KEY.USER_ID === event.data.key;
    const isNotSignupUser =
      USER_CONSTANTS.STORAGE_SAVE_KEY.USER_EMAIL === event.data.key;

    if (!isNotSignupUser && !isSignupUser) {
      return;
    }

    // 회원가입하지 않은 사용자일 경우
    if (isNotSignupUser) {
      _loginUser.email = getCookie(USER_CONSTANTS.STORAGE_SAVE_KEY.USER_EMAIL);
      routerLink = RouteLink.SIGNUP;
    }
    // 회원가입한 사용자일 경우
    else {
      _loginUser.userId = getCookie(USER_CONSTANTS.STORAGE_SAVE_KEY.USER_ID);
      routerLink = RouteLink.MYCAVE;
    }

    _loginUser.token = getCookie(USER_CONSTANTS.STORAGE_SAVE_KEY.USER_TOKEN);
    setLoginUser(_loginUser);
    router.push(routerLink);
  };

  return { onLogin, isLogin };
};

export default useKakaoLogin;
