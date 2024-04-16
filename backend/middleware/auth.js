import jwt from "jsonwebtoken";
import ENV from "../config.js";

export default async function Auth(req, res, next) {
  console.log("Auth middleware called");
  try {
    // console.log("Authorization Header:", req.headers.authorization);

    if (!req.headers.authorization) {
      throw new Error("Authorization header missing");
    }

    const token = req.headers.authorization.split(" ")[1];
    // console.log("Token:", token);

    const decodedtoken = jwt.verify(token, ENV.JWT_SECRET);
    // console.log("Decoded Token:", decodedtoken);

    // Attach the decoded token to the request object
    req.user = decodedtoken;

    // Call the next middleware
    next();
  } catch (error) {
    console.error("Authentication Error:", error);
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
