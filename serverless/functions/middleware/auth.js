const jwt = require("jsonwebtoken");

module.exports = function (handler) {
  const token = handler.event.headers["x-auth-token"];
  if (!token)
    return {
      statusCode: 401,
      body: JSON.stringify({
        status: "failed",
        message: "Access denied. No token provided.",
      }),
    };

  try {
    const decoded = jwt.verify(token, process.env.REACT_APP_jwtPrivateKey);
    handler.event.user = decoded;
  } catch (ex) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid token." }),
    };
  }
};
