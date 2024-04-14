import USER_CONSTANTS from "@constants/userStorageConstants";
import axios from "axios";
import { getCookie } from "cookies-next";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Max-Age": "1728000",
    "Access-Control-Allow-Headers": "Content-Type",
    Accept: "*/*",
    withCredentials: true,
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (config.url?.startsWith("/api")) {
    // NOTE: 커스텀 서버에 replace 책임 변경
    // config.baseURL = `/`;
    config.baseURL = `${process.env.NEXT_PUBLIC_API_URL}/`;
    config.url = config.url.replace("/api", "");

    const token = getCookie(USER_CONSTANTS.STORAGE_SAVE_KEY.USER_TOKEN);
    config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  }

  if (config.url?.startsWith("/client-api")) {
    config.baseURL = `/`;
    config.url = config.url.replace("/client-api", "");

    return config;
  }

  return config;
});

export default axiosInstance;
