import { useEffect, useState } from "react";
import axiosInstance from "src/services/requests";

const useAPICategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axiosInstance.get(`/api/categories`);
      setCategories(data);
    })();
  }, []);

  return { categories };
};

export default useAPICategory;
