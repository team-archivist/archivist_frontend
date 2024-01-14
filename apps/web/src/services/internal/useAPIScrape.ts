type Response = {
  title: string;
  ogDescription: string;
  ogImage: string;
};

const useAPIScrape = (linkUrl?: string) => {
  const executeFetch = async () => {
    const response = await axios.post(`/scrape`, { linkUrl });
    return { ...response.data };
  };

  return { executeFetch };
};

export default useAPIScrape;
