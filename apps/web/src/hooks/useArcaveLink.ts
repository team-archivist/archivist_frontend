import USER_CONSTANTS from "@constants/userStorageConstants";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

type Props =
  | {
      isUser: true;
      userId: number;
    }
  | {
      isUser: false;
      linkId: number;
    };

const useArcaveLink = ({ isUser, userId, linkId }: Props) => {
  const [links, setLinks] = useState<any[]>();

  useEffect(() => {
    if (!userId) {
      return;
    }

    const token = getCookie(USER_CONSTANTS.STORAGE_SAVE_KEY.USER_TOKEN);
    const AuthorizationToken = `Bearer ${token}`;

    const fetchLink = async () => {
      const response = await axios.get(
        isUser ? `/api/user/link/${userId}` : `/api/link/${linkId}`,
        {
          headers: {
            Authorization: AuthorizationToken,
          },
        }
      );
      setLinks(response.data);
    };

    fetchLink();
  }, [userId]);

  return {
    links,
    hasLink: !!links && links.length > 0,
  };
};

export default useArcaveLink;
