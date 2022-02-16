export const TOKEN_KEY = "ADMIN_TOKEN";

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const isAuthenticated = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return token !== null;
};

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
};
