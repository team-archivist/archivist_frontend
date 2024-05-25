import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import LoginView from "@arcave/components/LoginView";
import useKakaoLogin from "@arcave/hooks/useKakaoLogin";

const LoginPage = () => {
  const { onLogin } = useKakaoLogin();
  const router = useRouter();
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
