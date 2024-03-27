import { format, resolve } from "path";
import UserModel from "../model/User.model.js";
import { rejects } from "assert";
import { error } from "console";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import ENV from "../config.js";

import otpGenerator from "otp-generator";

//middleware for verify user
export async function verifyUser(req, res, next) {
  try {
    const { username } = req.method == "GET" ? req.query : req.body;

    //check the user existance
    let exist = await UserModel.findOne({ username });
    if (!exist) return res.status(404).send({ error: "Can't find User !" });
    next();
  } catch (error) {
    return res.status(404).send({ error: "Authentication Error" });
  }
}

//POST : http://localhost:8080/api/register
export async function register(req, res) {
  try {
    const { username, password, email, profile } = req.body;

    //check existing user
    const existUsername = UserModel.findOne({ username }).exec();

    //check existing email
    const existEmail = UserModel.findOne({ email }).exec();

    Promise.all([existUsername, existEmail])
      .then(([existingUsername, existingEmail]) => {
        if (existingUsername) {
          throw { error: "Please use a unique username" };
        }
        if (existingEmail) {
          throw { error: "Please use a unique email" };
        }

        if (password) {
          return bcrypt.hash(password, 10);
        }
        throw { error: "Password is required" };
      })
      .then((hashedPassword) => {
        const user = new UserModel({
          username,
          password: hashedPassword,
          profile: profile || "",
          email,
        });

        // Save user
        return user.save();
      })
      .then((result) => {
        res.status(201).send({ msg: "User Registered Successfully" });
      })
      .catch((error) => {
        console.error("Registration error:", error);
        res
          .status(500)
          .send({ error: error.message || "Internal Server Error" });
      });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).send({ error: "Unexpected error occurred" });
  }
}

//POST : http://localhost:8080/api/login
export async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).send({ error: "Username not found" });
    }

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      console.log("Password mismatch:", password, user.password);
      return res.status(400).send({ error: "Password doesn't match" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
      },
      ENV.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).send({
      msg: "Login Successful...!",
      username: user.username,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).send({ error });
  }
}

//GET : http://localhost:8080/api/user/example123
export async function getUser(req, res) {
  const { username } = req.params;
  //console.log('Username:', username);
  try {
    if (!username) return res.status(501).send({ error: "Invalid Username" });

    const user = await UserModel.findOne({ username }).exec();
    //console.log("User found:", user);
    if (!user) return res.status(501).send({ error: "Couldn't find the user" });

    const { password, ...rest } = Object.assign({}, user.toJSON()); //removing password from the data

    return res.status(201).send(rest);
  } catch (error) {
    /* console.error("Catch Block Error:", error); */
    return res.status(404).send({ error: "Cannot find User Data" });
  }
}

//PUT : http://localhost:8080/api/updateuser
export async function updateUser(req, res) {
  try {
    const { userId } = req.user;

    if (!userId) {
      return res.status(401).send({ error: "User ID not provided" });
    }

    const body = req.body;
    const user = await UserModel.updateOne({ _id: userId }, body).exec();

    if (user.nModified === 0) {
      return res.status(404).send({ error: "User not found" });
    }

    return res.status(201).send({ msg: "Record Updated!" });
  } catch (error) {
    console.error("Update User Error:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
}

//GET : http://localhost:8080/api/generateOTP
export async function generateOTP(req, res) {
  req.app.locals.OTP = await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  res.status(201).send({ code: req.app.locals.OTP });
}

//GET : http://localhost:8080/api/verifyOTP
export async function verifyOTP(req, res) {
  const { code } = req.query;
  if (parseInt(req.app.locals.OTP) == parseInt(code)) {
    req.app.locals.OTP = null; //reset the OTP value
    req.app.locals.resetSession = true; //start session for reset password
    return res.status(201).send({ msg: "Verified Successfully !!" });
  }

  return res.status(400).send({ error: "Invalid OTP" });
}

//GET : http://localhost:8080/api/createResetSession
export async function createResetSession(req, res) {
  if (req.app.locals.resetSession) {
    req.app.locals.resetSession = false; //allow access to this route only once
    return res.status(201).send({ msg: "Access granted!!" });
  }
  return res.status(440).send({ error: "Session expired!!" });
}

//PUT : http://localhost:8080/api/resetPassword
export async function resetPassword(req, res) {
  try {
    if (!req.app.locals.resetSession)
      return res.status(440).send({ error: "Session expired!!" });

    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).send({ error: "Username not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.updateOne(
      { username: user.username },
      { password: hashedPassword }
    );
    req.app.locals.resetSession = false; //allow access to this route only once
    return res.status(201).send({ msg: "Record Updated" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
}
