// utils/authStorage.ts
const TOKEN_KEY = "token";
const USER_ID_KEY = "userId";
const USER_TYPE_KEY = "userType";

export const saveAuthData = (
  token: string,
  userId: string,
  userType: string
) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_ID_KEY, userId);
    localStorage.setItem(USER_TYPE_KEY, userType);
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

export const clearAuthData = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem(USER_TYPE_KEY);
  }
};
