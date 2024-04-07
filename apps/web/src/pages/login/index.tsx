import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LoginView } from "@archivist/ui";
import useKakaoLogin from "@hooks/useKakaoLogin";

/** 카카오 로그인 관련 페이지입니다 */
const LoginPage = (props) => {
  const { onLogin } = useKakaoLogin();
  const router = useRouter();

  /** loginView 관련 로직입니다 */
  const [mountedByLoginView, setMountedByLoginView] = useState<boolean>(false);

  useEffect(() => {
    setMountedByLoginView(true);
  }, []);

  return (
    <>
      {mountedByLoginView && (
        <LoginView
          onClickByLogin={onLogin}
          onClickByClose={() => router.push("/")}
        />
      )}
    </>
  );
};
export default LoginPage;
