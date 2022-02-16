import axios from "axios";

const baseApiUrl = process.env.REACT_APP_API_URL;

const apiAxios = (
  { url, method, headers = null, params, data = null },
  appStateDispatch
) => {
  if (appStateDispatch) {
    appStateDispatch({ type: "START_LOADING" });
  }

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

  return new Promise((resolve, reject) => {
    axios(baseApiUrl + url, config)
      .then((response) => {
        if (appStateDispatch) {
          appStateDispatch({ type: "SET_ERROR", payload: false });
          appStateDispatch({ type: "FINISH_LOADING" });
        }
        resolve(response);
      })
      .catch((error, ...rest) => {
        if (appStateDispatch) {
          appStateDispatch({ type: "FINISH_LOADING" });
          if (error.response.status === 404) {
            appStateDispatch({ type: "SET_ERROR", payload: true });
          }
        }
        reject(error.response);
      });
  });
};

export default apiAxios;
