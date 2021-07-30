const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
  //  NOT CASE SENSITIVE, AND THE CONVENTION IS Authorization: 'Bearer TOKEN'
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Authentication failed!");
    }
    const decodedToken = jwt.verify(token, "jwt-secrete-key");
    req.userData = { userId: decodedToken.userId };
    next();
  } catch {
    const error = new HttpError(" Token authentication failed!", 401);
    return next(error);
  }
};
