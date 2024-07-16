import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import USER_CONSTANTS from "@arcave/constants/userStorageConstants";
import axiosInstance from "@arcave/services/requests";
import { deletePreviousTokenInCookie } from "@arcave/utils/cookie";

type User = {
  userId: number;
  email: string;
  nickname: string;
  imgUrl: string;
  categories: string[];
};

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<User>();
  const router = useRouter();

  useEffect(() => {
    // NOTE: 유저정보가 이미 존재하는 경우 유저정보를 가져오지 않도록
    if (currentUser) {
      return;
    }

    const token = getCookie(USER_CONSTANTS.STORAGE_SAVE_KEY.USER_TOKEN);

    if (!token) {
      alert("로그인을 다시 진행해야합니다.");
      router.push("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`/api/user`);
        setCurrentUser(response.data);
      } catch (e) {
        alert("회원정보가 올바르지 않습니다. 다시 로그인해주세요.");
        deletePreviousTokenInCookie();
        router.push("/login");
      }
    };

    fetchUser();
  }, []);

  return {
    currentUser,
  };
};

export default useCurrentUser;
