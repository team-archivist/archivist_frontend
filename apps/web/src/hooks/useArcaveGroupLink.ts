import USER_CONSTANTS from "@constants/userStorageConstants";
import axiosInstance from "src/services/requests";
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
    const fetchLink = async () => {
      const response = await axiosInstance.get( `/api/group/link/${groupId}` );
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
