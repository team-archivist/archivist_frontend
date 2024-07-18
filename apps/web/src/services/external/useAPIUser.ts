import LoginUserModel from "@arcave/model/LoginUserModel";
import axiosInstance from "@arcave/services/requests";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const useAPIUser = ({ required = false }: { required?: boolean } = {}) => {
  const router = useRouter();
  const [loginUser, setLoginUser] = useState<LoginUserModel | undefined | null>(
    undefined,
  );

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
        setLoginUser(null);
      }
    })();
  }, [required]);

  const updateUser = useCallback(
    async ({
      email,
      nickname,
      categories,
      userImage,
    }: {
      email: string;
      nickname: string;
      categories: string;
      userImage?: any;
    }) => {
      if (!loginUser) {
        return;
      }

      const formData = new FormData();
      formData.append(
        "userDto",
        new Blob(
          [
            JSON.stringify({
              email,
              nickname,
              categories,
            }),
          ],
          {
            type: "application/json",
          },
        ),
      );

      if (userImage) {
        formData.append("userImgFile", userImage);
      }

      try {
        const { data: user } = await axiosInstance.patch(
          `/api/user/${loginUser.userId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
        setLoginUser(user);
      } catch (e: any) {
        console.error(e);
        alert("에러가 발생했습니다.");
      }
    },
    [loginUser],
  );

  const withdrawUser = useCallback(async () => {
    if (!loginUser) {
      return;
    }

    try {
      await axiosInstance.delete(`/api/user/${loginUser.userId}`);
      await router.replace("/");
    } catch (e: any) {
      console.error(e);
      alert("에러가 발생했습니다.");
    }
  }, [loginUser, router]);

  return { loginUser, updateUser, withdrawUser };
};
export default useAPIUser;
