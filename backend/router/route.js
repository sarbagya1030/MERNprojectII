import { Router } from "express";
import { registerMail } from "../controllers/mailer.js";

import Auth, { localVariables } from "../middleware/auth.js";

const router = Router();

//import controllers
import * as controller from "../controllers/appController.js";

//POST method
router.route("/register").post(controller.register); //register user
router.route("/registerMail").post(registerMail); //to send email
router
  .route("/authenticate")
  .post(controller.verifyUser, (req, res) => res.end()); //authenticate user
router.route("/login").post(controller.verifyUser, controller.login); //login in app

//GET method
router.route("/getusers").get(controller.getAllUsers);
router.route("/user/:username").get(controller.getUser); //user with the username
router.route("/user/id/:id").get(controller.getUserById); // User with the ID
router
  .route("/generateOTP")
  .get(controller.verifyUser, localVariables, controller.generateOTP); //generate random  OTP
router.route("/verifyOTP").get(controller.verifyUser, controller.verifyOTP); //verify generated OTP
router.route("/createResetSession").get(controller.createResetSession); //reset all the variables

//PUT method
router.route("/updateuser").put(Auth, controller.updateUser); //to update user profie
router
  .route("/resetPassword")
  .put(controller.verifyUser, controller.resetPassword); //to reset password

//DELETE method
router.route("/deleteuser/:id").delete(controller.deleteUser); // to delete user

export default router;
