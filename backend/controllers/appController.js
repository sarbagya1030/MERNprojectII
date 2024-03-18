import { format, resolve } from "path";
import UserModel from "../model/User.model.js";
import { rejects } from "assert";
import { error } from "console";
import bcrypt from "bcrypt";

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
  res.json("login route");
}

//GET : http://localhost:8080/api/user/example123
export async function getUser(req, res) {
  res.json("getUser route");
}

//PUT : http://localhost:8080/api/updateuser
export async function updateUser(req, res) {
  res.json("updateUser route");
}

//GET : http://localhost:8080/api/generateOTP
export async function generateOTP(req, res) {
  res.json("generateOTP route");
}

//GET : http://localhost:8080/api/verifyOTP
export async function verifyOTP(req, res) {
  res.json("verifyOTP route");
}

//GET : http://localhost:8080/api/createResetSession
export async function createResetSession(req, res) {
  res.json("createResetSession route");
}

//PUT : http://localhost:8080/api/resetPassword
export async function resetPassword(req, res) {
  res.json("resetPassword route");
}
