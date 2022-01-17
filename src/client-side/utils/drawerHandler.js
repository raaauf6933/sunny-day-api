function drawerHandler(navigate, url, params, currentLocation) {
  const close = () =>
    navigate(
      url({
        ...params,
        drawer: undefined,
      })
    );

  const open = (drawer, newParams) => {
    navigate(
      url(
        {
          drawer,
          ...params,
          ...newParams,
        },
        currentLocation
      )
    );
  };

  return [open, close];
}

export default drawerHandler;
