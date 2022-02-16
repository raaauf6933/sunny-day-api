/* eslint-disable no-useless-escape */

const specialCharacterPattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
const numberPattern = /\d/;
const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const isnumberPattern = /^\d+$/;

export const restrictInput = (name, value) => {
  switch (name) {
    case "first_name":
      if (value.match(specialCharacterPattern) || value.match(numberPattern)) {
        return true;
      }
      return null;
    case "last_name":
      if (value.match(specialCharacterPattern) || value.match(numberPattern)) {
        return true;
      }
      return null;
    case "contact_number":
      if (value.match(isnumberPattern) || value === "") {
        return null;
      }
      return true;
    case "province":
      if (value.match(specialCharacterPattern) || value.match(numberPattern)) {
        return true;
      }
      return null;
    case "city":
      if (value.match(specialCharacterPattern) || value.match(numberPattern)) {
        return true;
      }
      return null;
    default:
      break;
  }
};

export const formValidation = (data) => {
  const { email, contact_number } = data;

  const emailMessage = () => {
    if (!email.match(emailPattern)) {
      return "Enter valid email address";
    }
    return null;
  };

  const mobileNumberMessage = () => {
    if (contact_number.substring(0, 2) !== "09") {
      return "Enter valid mobile number";
    }
    return null;
  };

  return {
    email: emailMessage(),
    contact_number: mobileNumberMessage(),
  };
};

export const hasNull = (object) => {
  let isnull = false;

  Object.values(object).map((e) => {
    if (!e) {
      isnull = true;
    }
    return [];
  });

  return isnull;
};

export const hasNoError = (validationError) => {
  let thisReturn = true;
  Object.keys(validationError).map((key) => {
    if (thisReturn) {
      thisReturn = validationError[key] === null;
    }
    return [];
  });
  return thisReturn;
};
