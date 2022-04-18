export const userValidation = (initialForm) => {
  const { first_name, last_name, username, password, email } = initialForm;

  const firstNameMessage = () => {
    if (first_name === "") {
      return "This field is required.";
    }
    return null;
  };

  const lastNameMessage = () => {
    if (last_name === "") {
      return "This field is required.";
    }
    return null;
  };

  const emailMessage = () => {
    if (email === "") {
      return "This field is required.";
    }
    return null;
  };

  const usernameMessage = () => {
    if (username === "") {
      return "This field is required.";
    } else if (username.length < 6) {
      return "Username should be minimum of 6 characters";
    }
    return null;
  };

  const passwordMessage = () => {
    if (password === "" || password === null || password === undefined) {
      return "This field is required.";
    } else if (password.length < 6) {
      return "Password should be minimum of 6 characters";
    }
    return null;
  };

  return {
    first_name: firstNameMessage(),
    last_name: lastNameMessage(),
    username: usernameMessage(),
    password: passwordMessage(),
    email: emailMessage(),
  };
};
