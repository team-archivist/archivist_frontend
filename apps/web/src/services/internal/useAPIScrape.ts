import axiosInstance from "../requests";

const useAPIScrape = (linkUrl?: string) => {
  const executeFetch = async () => {
    const response = await axiosInstance.post(`/client/api/metainfo`, {
      linkUrl,
    });
    return { ...response.data };
  };

  return { executeFetch };
};

export default useAPIScrape;
