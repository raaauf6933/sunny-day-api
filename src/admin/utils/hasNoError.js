export const hasNoError = (validationError) => {
  let thisReturn = true;
  Object.keys(validationError).map((key) => {
    if (thisReturn) {
      thisReturn = validationError[key] === null;
    }
  });
  return thisReturn;
};
