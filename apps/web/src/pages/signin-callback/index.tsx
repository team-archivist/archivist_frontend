import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axiosInstance from "src/services/requests";

import USER_CONSTANTS from "@arcave/constants/userStorageConstants";
import { deletePreviousTokenInCookie } from "@arcave/utils/cookie";

type TokenData = {
  key: string;
  token: string;
  value?: string;
  userId?: string;
};

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
      try {
        const userInfo = await onRequestKaKaoLogin();
        // NOTE: 실패한 경우 다시 시도하도록
        if (!userInfo) {
          deletePreviousTokenInCookie();
          window.opener.postMessage({ code: "failed" }, "*");
          window.close();
          return;
        }

        const twelveHours = 12 * 60 * 60 * 1000;
        const expiresDate = new Date(Date.now() + twelveHours);
        setCookie(USER_CONSTANTS.STORAGE_SAVE_KEY.USER_TOKEN, userInfo?.token, {
          expires: expiresDate,
        });

        // FIXME : 리턴 인터페이스 구조를 맞춰야 할 필요가 있음. 어떤 경우에는 value로 넘어오고 어떤 경우에는 userId로 넘어옴.
        const cookieValue =
          userInfo.key === USER_CONSTANTS.STORAGE_SAVE_KEY.USER_ID
            ? userInfo.userId
            : userInfo.value;
        setCookie(userInfo?.key, cookieValue, {
          expires: expiresDate,
        });

        window.opener.postMessage(
          { code: "success", userInfo, key: userInfo.key },
          "*",
        );
        window.close();
      } catch (e) {
        console.log(e);
      }
    })();
  }, [router.query]);

  /** kakaoLogin 요청입니다 */
  const onRequestKaKaoLogin = async (): Promise<undefined | TokenData> => {
    try {
      const res = await axiosInstance.post<{ value: string; token: string }>(
        `/api/login/kakao`,
        { code: router.query.code },
        { headers: { "Content-Type": "multipart/form-data" } },
      );
      return {
        ...res?.data,
        key: USER_CONSTANTS.STORAGE_SAVE_KEY.USER_ID,
      };
    } catch (e) {
      const data = e.response?.data;
      if (404 === data?.statusCode) {
        return {
          key: USER_CONSTANTS.STORAGE_SAVE_KEY.USER_EMAIL,
          value: data?.email || "",
          token: data?.token,
        };
      }
    }
  };

  return <div>로그인중입니다</div>;
};
export default SigninCallback;
