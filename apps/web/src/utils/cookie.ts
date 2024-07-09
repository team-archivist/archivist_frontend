import USER_CONSTANTS from "@arcave/constants/userStorageConstants";
import { deleteCookie } from "cookies-next";

export const deletePreviousTokenInCookie = async ({ req, res }: any = {}) => {
  deleteCookie(USER_CONSTANTS.STORAGE_SAVE_KEY.USER_TOKEN, { req, res });
  deleteCookie(USER_CONSTANTS.STORAGE_SAVE_KEY.USER_ID, { req, res });
  deleteCookie(USER_CONSTANTS.STORAGE_SAVE_KEY.USER_EMAIL, { req, res });
  deleteCookie(USER_CONSTANTS.STORAGE_SAVE_KEY.USER_INFO, { req, res });
};
