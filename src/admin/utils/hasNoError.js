export const hasNoError = (validationError) => {
  let thisReturn = true;
  // eslint-disable-next-line array-callback-return
  Object.keys(validationError).map((key) => {
    if (thisReturn) {
      thisReturn = validationError[key] === null;
    }
  });
  return thisReturn;
};
