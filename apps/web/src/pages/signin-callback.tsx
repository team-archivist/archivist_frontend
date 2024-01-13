import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import { setCookie } from "cookies-next";

import USER_CONSTANTS from "@constants/userStorageConstants";

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
        key: USER_CONSTANTS.STORAGE_SAVE_KEY.USER_ID,
        value: "",
      };
      try {
        const res = await axios.post(
          `/api/login/kakao`,
          { code: router.query.code },
          {
            headers: {
              "Content-Type": "multipart/form-data;",
              Accept: "*/*",
              withCredentials: true,
            },
          }
        );
        sessionItem.value = res?.data?.userId || "";
        localStorage.setItem(
          USER_CONSTANTS.STORAGE_SAVE_KEY.USER_TOKEN,
          res?.data?.token
        );
      } catch (e) {
        sessionItem.key = USER_CONSTANTS.STORAGE_SAVE_KEY.USER_EMAIL;
        sessionItem.value = e.response?.data?.message || "";
      }

      localStorage.setItem(sessionItem.key, sessionItem.value);
      window.close();
    })();
  }, [router.query]);

  return <div>카카오톡 로그인 콜백</div>;
};

export default SigninCallback;
