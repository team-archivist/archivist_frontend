import LoginUserModel from "@arcave/model/LoginUserModel";
import axiosInstance from "@arcave/services/requests";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useAPIUser = ({ required = false }: { required?: boolean } = {}) => {
  const router = useRouter();
  const [loginUser, setLoginUser] = useState<LoginUserModel>();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance.get(`/api/user`);
        setLoginUser(data);
      } catch (e: any) {
        if (e instanceof AxiosError) {
          if (e.response?.status === 401 && required) {
            alert("로그인이 필요합니다.");
            await router.replace("/login");
          }
        }
      }
    })();
  }, []);

  return { loginUser };
};
export default useAPIUser;
