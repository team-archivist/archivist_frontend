import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import USER_CONSTANTS from "@constants/userStorageConstants";
import { setCookie } from "cookies-next";
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
      const sessionItem = {
        key: "",
        value: "",
      };
      let token = ""; // jwt token
      try {
        localStorage.removeItem( USER_CONSTANTS.STORAGE_SAVE_KEY.USER_TOKEN );
        localStorage.removeItem( USER_CONSTANTS.STORAGE_SAVE_KEY.USER_ID );
        localStorage.removeItem( USER_CONSTANTS.STORAGE_SAVE_KEY.USER_EMAIL );

        const res = await axiosInstance.post(
          `/api/login/kakao`,
          { code: router.query.code },
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        sessionItem.key = USER_CONSTANTS.STORAGE_SAVE_KEY.USER_ID;
        sessionItem.value = res?.data?.userId || "";
        token = res?.data?.token;
      } catch (e) {
        const data = e.response?.data;
        if (404 === data.statusCode) {
          sessionItem.key = USER_CONSTANTS.STORAGE_SAVE_KEY.USER_EMAIL;
          sessionItem.value = data?.email || "";
          token = data.token;
        }
      }
      setCookie(USER_CONSTANTS.STORAGE_SAVE_KEY.USER_TOKEN, token);
      localStorage.setItem(USER_CONSTANTS.STORAGE_SAVE_KEY.USER_TOKEN, token);

      setCookie(sessionItem.key, sessionItem.value);
      localStorage.setItem(sessionItem.key, sessionItem.value);
      window.close();
    })();
  }, [router.query]);

  return <div>카카오톡 로그인 콜백</div>;
};
export default SigninCallback;
