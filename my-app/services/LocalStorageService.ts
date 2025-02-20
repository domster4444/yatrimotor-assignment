// ====== store data in local storage ======

export const storeDataByValue = (key: any, value: any) => {
  localStorage.setItem(key, value);
};

export const storeDataByObj = (key: any, objParam: any) => {
  localStorage.setItem(key, JSON.stringify(objParam));
};

// ====== get data from local storage ======

export const getDataByValue = (key: any) => {
  return localStorage.getItem(key);
};

export const getDataByObj = (key: any) => {
  // @ts-ignore
  return JSON.parse(localStorage.getItem(key));
};

// ====== remove data from local storage ======

export const removeDataByValue = (key: any) => {
  localStorage.removeItem(key);
};
