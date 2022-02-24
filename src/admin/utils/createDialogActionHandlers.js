function createDialogActionHandlers(navigate, id, url, params) {
  const close = (closeParams) => {
    const parameters = closeParams
      ? { ...params, action: undefined, roomImage: undefined, ...closeParams }
      : {
          ...params,
          action: undefined,
          roomImage: undefined,
        };

    navigate(url(parameters, id ? id : null));
  };

  const open = (action, newParams) => {
    navigate(
      url(
        {
          action,
          ...params,
          ...newParams,
        },
        id ? id : null
      )
    );
  };

  return [open, close];
}

export default createDialogActionHandlers;
