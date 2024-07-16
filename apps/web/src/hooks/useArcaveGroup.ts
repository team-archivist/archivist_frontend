import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import axiosInstance from "@arcave/services/requests";

import CommonUtils from "../utils/commonUtils";

type Props =
  | {
      isUser: true;
      userId: number | undefined;
    }
  | {
      isUser: false;
      groupId: number | undefined;
    };

/**
 * - ArcaveGroup 관련 hook 입니다
 */
const useArcaveGroup = ({ isUser, userId, groupId }: Props) => {
  const [group, setGroup] = useState();
  const router = useRouter();

  useEffect(() => {
    if (!isUser && CommonUtils.isUndefined(groupId)) {
      return;
    }
    if (isUser && !userId) {
      return;
    }
    const fetchGroup = async () => {
      let response = {
        data: null,
      };
      try {
        response = await axiosInstance.get(
          isUser ? `/api/user/group/${userId}` : `/api/group/${groupId}`,
        );
      } catch (e) {
        window.alert("존재하지 않는 그룹입니다");
        router.back();
      }
      setGroup(response.data);
    };
    fetchGroup();
  }, [groupId, userId]);

  return {
    group,
    hasGroup: !!group && group.length > 0,
  };
};
export default useArcaveGroup;
