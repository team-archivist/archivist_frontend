import { useCallback, useEffect, useState } from "react";

import axiosInstance from "@arcave/services/requests";

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

  const fetchLink = async () => {
    const response = await axiosInstance.get(
      isUser ? `/api/user/link/${userId}` : `/api/link/${linkId}`,
    );
    setLinks(response.data);
  };

  useEffect(() => {
    if (!userId) {
      return;
    }

    // const token = getCookie(USER_CONSTANTS.STORAGE_SAVE_KEY.USER_TOKEN);
    // const AuthorizationToken = `Bearer ${token}`;

    fetchLink();
  }, [userId]);

  const updateLink = useCallback(() => {
    setLinks([]);

    if (!userId) {
      return;
    }

    fetchLink();
  }, [userId]);

  return {
    links,
    hasLink: !!links && links.length > 0,
    updateLink,
  };
};

export default useArcaveLink;
