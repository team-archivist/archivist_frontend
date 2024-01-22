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
  groupId: number;
};

const useArcaveGroup = ({ isUser , userId, groupId }: Props) => {
  const [group, setGroup] = useState<any[]>();

  useEffect(() => {
    if (!userId && !groupId) {
      return;
    }

    const token = getCookie(USER_CONSTANTS.STORAGE_SAVE_KEY.USER_TOKEN);
    const AuthorizationToken = `Bearer ${token}`;

    const fetchLink = async () => {
      const response = await axios.get(
        isUser ? `/api/user/group/${userId}` : `/api/group/${groupId}`,
        {
          headers: {
            Authorization: AuthorizationToken,
          },
        }
      );
      console.log( 'response' , response , groupId );
      setGroup(response.data);
    };

    fetchLink();
  }, [userId , groupId]);

  return {
    group,
    hasGroup: !!group && group?.groupId,
  };
};
export default useArcaveGroup;
