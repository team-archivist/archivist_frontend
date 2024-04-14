import USER_CONSTANTS from "@constants/userStorageConstants";

import { getCookie } from "cookies-next";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axiosInstance from "src/services/requests";

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
        alert("로그인을 다시 진행해주세요.");
        router.push("/");
        return;
      }
    };

    fetchUser();
  }, []);

  return {
    currentUser,
  };
};

export default useCurrentUser;
