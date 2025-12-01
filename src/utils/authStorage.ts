import moment from "moment";

// utils/authStorage.ts
const TOKEN_KEY = "token";
const USER_ID_KEY = "userId";
const USER_TYPE_KEY = "userType";
const LOGIN_TIME_KEY = "loginTime";


export const saveAuthData = (
  token: string,
  userId: string,
  userType: string,
  loginTime: string
) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_ID_KEY, userId);
    localStorage.setItem(USER_TYPE_KEY, userType);
    localStorage.setItem(LOGIN_TIME_KEY, loginTime);
  }
};

export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

export const getUserId = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(USER_ID_KEY);
  }
  return null;
};

export const getUserType = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(USER_TYPE_KEY);
  }
  return null;
};

export const getLoginTime = (): string | null => {
  return typeof window !== "undefined" ? localStorage.getItem("loginTime") : null;
};

export const updateLoginTime = () => {
  if (typeof window !== "undefined") {
    localStorage.setItem("loginTime", moment().toISOString());
  }
};

// Multi-tab logout sync
export const broadcastLogout = () => {
  localStorage.setItem("logoutEvent", Date.now().toString());
};

export const clearAuthData = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem(USER_TYPE_KEY);
    localStorage.removeItem(LOGIN_TIME_KEY);
    broadcastLogout();

  }
};
