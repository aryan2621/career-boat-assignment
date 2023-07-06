import axios from "axios";
import { SuccessLogin } from "../model/success-login";
import { User } from "../model/user";
import DB from "../enums/DB";

export const getUserDetails = async (accessToken: string) => {
  const { data } = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    }
  );
  return data;
};

export const storeUserInLS = (user: User) => {
  localStorage.setItem(DB.USER, JSON.stringify(user));
};

export const getUserFromLS = () => {
  const user = localStorage.getItem(DB.USER);
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

export const removeUserFromLS = () => {
  localStorage.removeItem(DB.USER);
};

export const getAccessTokenFromLS = () => {
  const accessToken = localStorage.getItem(DB.ACCESS_TOKEN);
  if (accessToken) {
    return JSON.parse(accessToken);
  }
  return null;
};
export const storeAccessTokenInLS = (accessToken: any) => {
  const minutesPassed = new Date().getHours() * 60 + new Date().getMinutes();
  accessToken["expires_in"] = Number(accessToken["expires_in"]) + minutesPassed;
  localStorage.setItem(DB.ACCESS_TOKEN, JSON.stringify(accessToken));
};
export const removeAccessTokenFromLS = () => {
  localStorage.removeItem(DB.ACCESS_TOKEN);
};
