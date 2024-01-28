import { useEffect } from "react";
import {useAtom} from "jotai/index";
import loginUserAtom from "@store/loginUserAtom";
import {useRouter} from "next/router";
import {useState} from "react/index";
import USER_CONSTANTS from "@constants/userStorageConstants";
import {setCookie} from "cookies-next";

/**
 * - KakaoLogin 관련 기능을 제공해주는 Hook 입니다
 */
const useKakaoLogin = () => {
    const [loginUser, setLoginUser] = useAtom(loginUserAtom);
    const router = useRouter();

    useEffect(() => {

        window.addEventListener("storage", onEndKakaoLogin);

        return () => {
            window.removeEventListener("storage", onEndKakaoLogin);
        };
    }, []);

    /** 로그인 버튼 클릭시 카카오 로그인창 오픈 */
    const onLogin = async () => {
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
    const onEndKakaoLogin = (storageEvent: StorageEvent) => {
        let routerLink = "/";
        let removeStorageKey = ""; // storage 에서 제거할 key
        const isSignupUser =
          USER_CONSTANTS.STORAGE_SAVE_KEY.USER_ID === storageEvent.key;
        const isNotSignupUser =
          USER_CONSTANTS.STORAGE_SAVE_KEY.USER_EMAIL === storageEvent.key;

        if ( !isNotSignupUser && !isSignupUser ){
            return;
        }

        // 회원가입하지 않은 사용자일 경우
        if (isNotSignupUser) {
            loginUser.email = localStorage.getItem(
              USER_CONSTANTS.STORAGE_SAVE_KEY.USER_EMAIL
            );
            routerLink = "/signup";
            removeStorageKey = USER_CONSTANTS.STORAGE_SAVE_KEY.USER_EMAIL;
        }
        // 회원가입한 사용자일 경우
        else {
            loginUser.userId = localStorage.getItem(
              USER_CONSTANTS.STORAGE_SAVE_KEY.USER_ID
            );
            // NOTE: SSR을 위해 cookie 활용 필요함
            setCookie(
              USER_CONSTANTS.STORAGE_SAVE_KEY.USER_TOKEN,
              localStorage.getItem(USER_CONSTANTS.STORAGE_SAVE_KEY.USER_TOKEN)
            );
            routerLink = "/mycave";
            removeStorageKey = USER_CONSTANTS.STORAGE_SAVE_KEY.USER_ID;
        }

        loginUser.token = localStorage.getItem(
          USER_CONSTANTS.STORAGE_SAVE_KEY.USER_TOKEN
        );
        setLoginUser(loginUser);
        localStorage.removeItem(USER_CONSTANTS.STORAGE_SAVE_KEY.USER_TOKEN);
        localStorage.removeItem(removeStorageKey);
        router.push(routerLink);
    };

    return {onLogin,}
}

export default useKakaoLogin;