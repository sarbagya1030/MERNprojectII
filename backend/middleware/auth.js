import jwt from "jsonwebtoken";
import ENV from "../config.js";

export default async function Auth(req, res, next) {
  try {
    //acces authorize header to validate request
    const token = req.headers.authorization.split(" ")[1];

    //retrieve user details of logged in user
    const decodedtoken = jwt.verify(token, ENV.JWT_SECRET);

    req.user = decodedtoken;
    next();
  } catch (error) {
    //console.log(error);
    res.status(401).json({ error: "Authentication Failed!" });
  }
}

export function localVariables(req, res, next) {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
}
