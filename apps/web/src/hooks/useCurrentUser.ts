import USER_CONSTANTS from "@constants/userStorageConstants";

import axios from "axios";
import { getCookie } from "cookies-next";

import { useEffect, useState } from "react";

type User = {
  userId: number;
  email: string;
  nickname: string;
  imgUrl: string;
  categories: string[];
};

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    const token = getCookie(USER_CONSTANTS.STORAGE_SAVE_KEY.USER_TOKEN);

    if (!token) {
      alert("로그인을 다시 진행해야합니다.");
      return;
    }
    const AuthorizationToken = `Bearer ${token}`;

    const fetchUser = async () => {
      const response = await axios.get(`/user`, {
        headers: {
          Authorization: AuthorizationToken,
        },
      });

      setCurrentUser(response.data);
    };

    fetchUser();
  }, []);

  return {
    currentUser,
  };
};

export default useCurrentUser;
