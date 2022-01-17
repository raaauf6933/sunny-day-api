function createDialogActionHandlers(navigate, id, url, params) {
  const close = () =>
    navigate(
      url(
        {
          ...params,
          action: undefined,
          roomImage: undefined,
        },
        id ? id : null
      )
    );

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
