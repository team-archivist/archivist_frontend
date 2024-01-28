import USER_CONSTANTS from "@constants/userStorageConstants";
import axiosInstance from "src/services/requests";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

type Props =
 {
  groupId: number | undefined;
};

// 특정 그룹의 링크조회
const useArcaveGroupLink = ({ groupId }: Props) => {
  const [links, setLinks] = useState<any[]>( [] );

  useEffect(() => {
    if (!groupId) {
      return;
    }
    const fetchLink = async () => {
      let response = {
        data : null,
      }
      try {
        response = await axiosInstance.get( `/api/group/link/${groupId}` );
      }
      catch( e ){
        console.log( '링크 에러' );
      }
      console.log( 'link res' , response.data )
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
