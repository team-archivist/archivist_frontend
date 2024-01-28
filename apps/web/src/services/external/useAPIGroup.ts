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

export const executeGroupFetch = async ({ groupDto, fileImageBlob }) => {
  const formData = new FormData();
  const groupDtoBlob = new Blob([JSON.stringify(groupDto)], {
    type: "application/json",
  });
  formData.append("groupDto", groupDtoBlob);

  if (fileImageBlob) {
    formData.append("groupImgFile", fileImageBlob);
  }

  const response = await axiosInstance.post(`/api/group`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const executeGroupPatch = async ({ groupDto, fileImageBlob }) => {
  const formData = new FormData();
  const groupDtoBlob = new Blob([JSON.stringify(groupDto)], {
    type: "application/json",
  });
  formData.append("groupDto", groupDtoBlob);

  if (fileImageBlob) {
    formData.append("groupImgFile", fileImageBlob);
  }
  console.log({ groupDto });

  const response = await axiosInstance.patch(
    `/api/group/${groupDto.groupId}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

export default useAPIGroup;
