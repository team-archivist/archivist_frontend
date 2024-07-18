import axiosInstance from "@arcave/services/requests";
import { useEffect, useState } from "react";

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
