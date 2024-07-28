import { useEffect, useState } from "react";

import axiosInstance from "@arcave/services/requests";

const useHomeFeed = () => {
  const [topGroups, setTopGroups] = useState<any[]>([]);
  const [middleGroups, setMiddleGroups] = useState<any[]>([]);
  const [bottomGroups, setBottomGroups] = useState<any[]>([]);

  const [topLinks, setTopLinks] = useState<any[]>([]);
  const [middleLinks, setMiddleLinks] = useState<any[]>([]);
  const [bottomLinks, setBottomLinks] = useState<any[]>([]);

  const [allLinks, setAllLinks] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const [
        { data: groupSections },
        { data: linkSections },
        { data: allLinks },
      ] = await Promise.all([
        axiosInstance.get("/api/home-GROUP"),
        axiosInstance.get("/api/home-LINK"),
        axiosInstance.get("/api/links"),
      ]);

      groupSections.forEach((groupSection: any) => {
        if (groupSection.section === "TOP") {
          setTopGroups((prev) => [...prev, groupSection.data]);
        } else if (groupSection.section === "MIDDLE") {
          setMiddleGroups((prev) => [...prev, groupSection.data]);
        } else if (groupSection.section === "BOTTOM") {
          setBottomGroups((prev) => [...prev, groupSection.data]);
        }
      });
      linkSections.forEach((linkSection: any) => {
        if (linkSection.section === "TOP") {
          setTopLinks((prev) => [...prev, linkSection.data]);
        } else if (linkSection.section === "MIDDLE") {
          setMiddleLinks((prev) => [...prev, linkSection.data]);
        } else if (linkSection.section === "BOTTOM") {
          setBottomLinks((prev) => [...prev, linkSection.data]);
        }
      });

      setAllLinks(allLinks);
    })();
  }, []);

  return {
    topGroups,
    middleGroups,
    bottomGroups,
    topLinks,
    middleLinks,
    bottomLinks,
    allLinks,
  };
};

export default useHomeFeed;
