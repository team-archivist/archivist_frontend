import { useEffect, useState } from "react";
import axiosInstance from "src/services/requests";

const useAPIGroupLink = (groupsByUser) => {
  const [linksWithGroupId, setLinksWithGroupId] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (groupsByUser?.length === 0) {
      return;
    }
    (async () => {
      try {
        setIsLoading(true);
        const groupsByLink = await Promise.all(
          groupsByUser.map((group) =>
            axiosInstance
              .get(`/api/group/link/${group.groupId}`)
              .then((response) => {
                return response.data.map((linkDto) => ({
                  ...linkDto,
                  groupId: group.groupId,
                }));
              })
          )
        );
        const result = groupsByLink.flatMap(
          (linkWithGroupId) => linkWithGroupId
        );

        setLinksWithGroupId(result);
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, [groupsByUser]);

  return { linksWithGroupId, isLoading };
};

export default useAPIGroupLink;
