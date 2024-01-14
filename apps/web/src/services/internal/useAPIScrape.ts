import axios from "axios";

const useAPIScrape = (linkUrl?: string) => {
  const executeFetch = async () => {
    const response = await axios.post(`/scrape`, { linkUrl });
    return { ...response.data };
  };

  return { executeFetch };
};

export default useAPIScrape;
