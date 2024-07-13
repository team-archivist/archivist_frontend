import { css } from "@emotion/react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import ACSkeleton from "@arcave/components/common/Skeleton";
import USER_CONSTANTS from "@arcave/constants/userStorageConstants";
import { deletePreviousTokenInCookie } from "@arcave/utils/cookie";
import axiosInstance from "@arcave/services/requests";
import { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import useAPIUser from "@arcave/services/external/useAPIUser";

type TokenData = {
  key: string;
  token: string;
  value?: string;
  userId?: string;
};

const onRequestKaKaoLogin = async (
  code: string,
): Promise<undefined | TokenData> => {
  try {
    const { data } = await axiosInstance.post<{
      value: string;
      token: string;
    }>(
      `/api/login/kakao`,
      { code },
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return {
      ...data,
      key: USER_CONSTANTS.STORAGE_SAVE_KEY.USER_ID,
    };
  } catch (e: any) {
    if (e instanceof AxiosError) {
      const data = e.response?.data;
      if (404 === e.status) {
        return {
          key: USER_CONSTANTS.STORAGE_SAVE_KEY.USER_EMAIL,
          value: data?.email || "",
          token: data?.token,
        };
      }
    }

    return {
      key: "",
      value: "",
      token: "",
    };
  }
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const { code } = query as any;

  if (!code) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  try {
    const userInfo = await onRequestKaKaoLogin(code);
    // NOTE: 실패한 경우 다시 시도하도록
    if (!userInfo) {
      deletePreviousTokenInCookie();
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    const twelveHours = 12 * 60 * 60 * 1000;
    const expiresDate = new Date(Date.now() + twelveHours);
    setCookie(USER_CONSTANTS.STORAGE_SAVE_KEY.USER_TOKEN, userInfo?.token, {
      req,
      res,
      httpOnly: false,
      secure: false,
      expires: expiresDate,
    });

    const cookieValue =
      userInfo.key === USER_CONSTANTS.STORAGE_SAVE_KEY.USER_ID
        ? userInfo.userId
        : userInfo.value;
    setCookie(userInfo?.key, cookieValue, {
      req,
      res,
      httpOnly: false,
      secure: false,
      expires: expiresDate,
    });

    return {
      props: {},
    };
  } catch (e) {
    console.log(e);
    deletePreviousTokenInCookie();
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

/**
 * - 카카오 로그인 callback 페이지
 */
const SigninCallback = () => {
  const router = useRouter();

  const { loginUser } = useAPIUser();

  useEffect(() => {
    if (loginUser === undefined) {
      return;
    }

    if (loginUser !== null) {
      // TODO: redirection url 설정 필요
      router.replace("/mycave").then();
    } else {
      alert("로그인에 실패했습니다.");
      router.replace("/").then();
    }
  }, [router, loginUser]);

  return (
    <div
      css={css`
        padding: 12px;
      `}
    >
      <ACSkeleton count={1} />
    </div>
  );
};

export default SigninCallback;
