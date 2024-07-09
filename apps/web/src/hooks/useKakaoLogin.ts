import { useRouter } from "next/router";

import useAPIUser from "@arcave/services/external/useAPIUser";

enum RouteLink {
  SIGNUP = "/signup",
  MYCAVE = "/mycave",
}

/**
 * - KakaoLogin 관련 기능을 제공해주는 Hook 입니다
 */
const useKakaoLogin = () => {
  const { loginUser } = useAPIUser();
  const router = useRouter();

  const onLogin = async () => {
    if (loginUser) {
      router.push(RouteLink.MYCAVE);
      return;
    }

    const kakaoLoginURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_API_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_API_REDIRECT_URL}&response_type=code`;

    window.location.href = kakaoLoginURL;
  };

  return { onLogin };
};

export default useKakaoLogin;
