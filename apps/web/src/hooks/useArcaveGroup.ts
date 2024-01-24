import {useEffect, useState} from "react";
import {getCookie} from "cookies-next";
import USER_CONSTANTS from "@constants/userStorageConstants";
import axiosInstance from "src/services/requests";

type Props =
  | {
  isUser: true;
  userId: number;
}
  | {
  isUser: false;
  groupId: number;
};
/**
 * - ArcaveGroup 관련 hook 입니다
 */
const useArcaveGroup = ( { isUser, userId , groupId } : Props ) => {
  const [ group , setGroup ] = useState();

  useEffect( () => {
    if ( !groupId ){
      return;
    }

    const fetchGroup = async () => {
      const response = await axiosInstance.get(
        isUser ? `/api/user/group/${userId}` : `/api/group/${groupId}`  );
      console.log( 'res' , response );
      setGroup( response.data );
    }
    fetchGroup();
  } , [groupId]);

  return {
    group,
    hasGroup : !!group && group.length > 0,
  }
}
export default useArcaveGroup;