import { useParams } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";

const SigninCallbackPage = () => {
  const params = useParams<{ code?: string }>();

  useEffect(() => {
    (async () => {
      if (params?.code) {
        // TODO : token을 회원가입으로 추가
        try {
          const response = await axios.post("/api/TBD", {
            token: params.code,
          });
          // TODO : 성공 액션에 대한 UI 처리
        } catch (error) {
          throw error;
        }
      }
    })();
  }, []);

  return <div>회원가입 중입니다</div>;
};

export default SigninCallbackPage;
