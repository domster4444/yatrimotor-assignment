//@ts-nocheck

import cookie from "js-cookie";

// ? store data in cookie
export const storeDataByValue = (key: any, value: any) => {
  if (window !== undefined) {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

export const storeDataByObject = (key: any, obj: any) => {
  if (window !== undefined) {
    cookie.set(key, JSON.stringify(obj), {
      expires: 1,
    });
  }
};

// ? get data of console  by value
export const getDataByValue = (key: any) => {
  if (window !== undefined && cookie.get(key)) {
    return cookie.get(key);
  }
  return null;
};

//? get data of console by object
export const getDataByObject = (key: any) => {
  if (window !== undefined) {
    cookie.remove(key);
  }
};
