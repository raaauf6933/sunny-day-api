const tokenKey = "client_token";

export const setJwt = (jwt) => {
  localStorage.setItem(tokenKey, jwt);
};

export const isAuthenticated = () => {
  const token = localStorage.getItem(tokenKey);
  return token !== null;
};
