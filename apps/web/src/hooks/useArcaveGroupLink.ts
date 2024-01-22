import USER_CONSTANTS from "@constants/userStorageConstants";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

type Props =
 {
  groupId: number;
};

// 특정 그룹의 링크조회
const useArcaveGroupLink = ({ groupId }: Props) => {
  const [links, setLinks] = useState<any[]>( [] );

  useEffect(() => {
    if (!groupId) {
      return;
    }

    const token = getCookie(USER_CONSTANTS.STORAGE_SAVE_KEY.USER_TOKEN);
    const AuthorizationToken = `Bearer ${token}`;

    const fetchLink = async () => {
      const response = await axios.get( `/api/group/link/${groupId}`,
        {
          headers: {
            Authorization: AuthorizationToken,
          },
        }
      );
      console.log('response' , response );
      setLinks(response.data);
    };

    fetchLink();
  }, [groupId]);

  return {
    links,
    hasLink: !!links && links?.length > 0,
  };
};

export default useArcaveGroupLink;
