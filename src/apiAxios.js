import axios from "axios";

const baseApiUrl = process.env.REACT_APP_API_URL;

const apiAxios = async ({
  url,
  method,
  headers = null,
  params,
  data = null,
}) => {
  const config = {
    method: method || "GET",
    headers: {
      ...headers,
      Accept: "application/json",
      //   Authorization: mobileCookie.access_token,
      // "x-current-platform": mobileCookie["x-current-platform"],
      // This is for zero rating security
    },
    params,
    data: data,
  };

  return axios(baseApiUrl + url, config)
    .then((response) => response)
    .catch((error) => error.response);
};

export default apiAxios;
