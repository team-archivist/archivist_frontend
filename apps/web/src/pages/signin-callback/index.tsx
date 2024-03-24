import { useRouter } from "next/router";
import { useEffect } from "react";
import USER_CONSTANTS from "@constants/userStorageConstants";
import { setCookie , deleteCookie } from "cookies-next";
import axiosInstance from "src/services/requests";

/**
 * - 카카오 로그인 callback 페이지
 */
const SigninCallback = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router.query?.code) {
      return;
    }
    (async () => {

      let userInfo = await onRequestKaKaoLogin();
      /**
       * 이전 token 이 남아있을 경우 간헐적으로 로그인이 되지않아
       * token 을 삭제하고 다시받아오도록 변경하였습니다
       */
      if ( !userInfo ){
        deleteCookie(USER_CONSTANTS.STORAGE_SAVE_KEY.USER_TOKEN);
        userInfo = await onRequestKaKaoLogin();
      }

      setCookie(USER_CONSTANTS.STORAGE_SAVE_KEY.USER_TOKEN, userInfo.token);
      setCookie(userInfo.key, userInfo.value);

      localStorage.setItem(USER_CONSTANTS.STORAGE_SAVE_KEY.USER_TOKEN, userInfo.token);
      localStorage.setItem(userInfo.key, userInfo.value);
      // window.close();
    })();
  }, [router.query]);

  /** kakaoLogin 요청입니다 */
  const onRequestKaKaoLogin = async () : Promise<{ key : string; value : string; token : string }> => {
    localStorage.removeItem( USER_CONSTANTS.STORAGE_SAVE_KEY.USER_TOKEN );
    localStorage.removeItem( USER_CONSTANTS.STORAGE_SAVE_KEY.USER_ID );
    localStorage.removeItem( USER_CONSTANTS.STORAGE_SAVE_KEY.USER_EMAIL );
    let data
    try {
      const res = await axiosInstance.post(
        `/api/login/kakao`,
        { code: router.query.code },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      data = {
        ...res?.data,
        key : USER_CONSTANTS.STORAGE_SAVE_KEY.USER_ID
      };
    }
    catch( e ){
      const data = e.response?.data;
      if (404 === data.statusCode) {
        return {
          key : USER_CONSTANTS.STORAGE_SAVE_KEY.USER_EMAIL,
          value : data?.email || "",
          token :data?.token,
        }
      }
      return;
    }

    return {
      key : data.key,
      value : data?.userId || "",
      token : data?.token,
    }
  }

  return <div>카카오톡 로그인 콜백</div>;
};
export default SigninCallback;
