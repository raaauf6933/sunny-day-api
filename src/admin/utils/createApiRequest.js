import apiAxios from "../../apiAxios";

export const createApiRequest = async (
  data,
  url,
  method,
  headers = null,
  appStateDispatch
) => {
  const response = await apiAxios(
    {
      url,
      method,
      headers,
      data,
    },
    appStateDispatch
  );

  return await response;
};
