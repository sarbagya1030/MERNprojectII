import { Router } from "express";
const router = Router();

//import controllers
import * as controller from "../controllers/appController.js";

//POST method
router.route("/register").post(controller.register); //register user
// router.route("/registerMail").post(); //to send email
router.route("/authenticate").post((req, res) => res.end()); //authenticate user
router.route("/login").post(controller.login); //login in app

//GET method
router.route("/user/:username").get(controller.getUser); //user with the username
router.route("/generateOTP").get(controller.generateOTP); //generate random  OTP
router.route("/verifyOTP").get(controller.verifyOTP); //verify generated OTP
router.route("/createResetSession").get(controller.createResetSession); //reset all the variables

//PUT method
router.route("/updateuser").put(controller.updateUser); //to update user profie
router.route("/resetPassword").put(controller.resetPassword); //to reset password

export default router;
