import { useEffect, useState } from "react";
import axiosInstance from "src/services/requests";

const useAPIGroup = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    (async () => {
      const {
        data: { userId },
      } = await axiosInstance.get(`/api/user`);

      const { data: groupsByUser } = await axiosInstance.get(
        `/api/user/group/${userId}`
      );
      setGroups(groupsByUser);
    })();
  }, []);

  return { groups };
};

export default useAPIGroup;
