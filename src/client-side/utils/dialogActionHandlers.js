function createDialogActionHandlers(navigate, sectionRoute, url, params) {
  const close = () =>
    navigate(
      url(
        {
          ...params,
          action: undefined,
          roomImage: undefined,
        },
        sectionRoute ? sectionRoute : null
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
        sectionRoute ? sectionRoute : null
      )
    );
  };

  return [open, close];
}

export default createDialogActionHandlers;
