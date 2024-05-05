import USER_CONSTANTS from "@constants/userStorageConstants";
import { deleteCookie } from "cookies-next";

export const deletePreviousTokenInCookie = async () => {
  deleteCookie(USER_CONSTANTS.STORAGE_SAVE_KEY.USER_TOKEN);
  deleteCookie(USER_CONSTANTS.STORAGE_SAVE_KEY.USER_ID);
  deleteCookie(USER_CONSTANTS.STORAGE_SAVE_KEY.USER_EMAIL);
  deleteCookie(USER_CONSTANTS.STORAGE_SAVE_KEY.USER_INFO);
};
