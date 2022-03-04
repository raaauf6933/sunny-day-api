function createDialogActionHandlers(navigate, id, url, params) {
  const close = (closeParams) => {
    navigate(
      url(
        {
          ...params,
          ...closeParams,
          action: undefined,
        },
        id ? id : null
      )
    );
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
