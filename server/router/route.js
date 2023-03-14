import { Router } from "express";
const router = Router();

/** import all controllers */
import * as controller from "../controllers/appController.js";
import * as studentController from "../controllers/studentController.js";
import { registerMail } from "../controllers/mailer.js";
import Auth, { localVariables } from "../middleware/auth.js";

/** POST Methods */
router.route("/register").post(controller.register); // register user
router.route("/registerMail").post(registerMail); // send the email
router
  .route("/authenticate")
  .post(controller.verifyUser, (req, res) => res.end()); // authenticate user
router.route("/login").post(controller.verifyUser, controller.login); // login in app

/** GET Methods */
router.route("/user/:email").get(controller.getUser); // user with username
router
  .route("/generateOTP")
  .get(controller.verifyUser, localVariables, controller.generateOTP); // generate random OTP
router.route("/verifyOTP").get(controller.verifyUser, controller.verifyOTP); // verify generated OTP
router.route("/createResetSession").get(controller.createResetSession); // reset all the variables

/** PUT Methods */
router.route("/updateuser").put(Auth, controller.updateUser); // is use to update the user profile
router
  .route("/resetPassword")
  .put(controller.verifyUser, controller.resetPassword); // use to reset password

/*****************************************************************************/
/** Student routes **/
/*****************************************************************************/
/** POST Methods */
router.route("/registerStudent").post(studentController.registerStudent); // register user
router.route("/students").get(studentController.students);
router.route("/student/:id").get(studentController.student);
router.route("/updatestudent/:id").put(studentController.updateStudent);
router.route("/deletestudent/:id").delete(studentController.deleteStudent);


/*****************************************************************************/
/** Parent routes **/
/*****************************************************************************/
/** POST Methods */
router.route("/registerParent").post(parentController.registerParent); // register user
router.route("/parents").get(parentController.parents);
router.route("/parent/:id").get(parentController.parent);
router.route("/updateparent/:id").put(parentController.updateParent);
router.route("/deleteparent/:id").delete(parentController.deleteParent);


/*****************************************************************************/
/** Teacher routes **/
/*****************************************************************************/
/** POST Methods */
router.route("/registerTeacher").post(teacherController.registerTeacher); // register user
router.route("/teachers").get(teacherController.teachers);
router.route("/teacher/:id").get(teacherController.teacher);
router.route("/updateteacher/:id").put(teacherController.updateTeacher);
router.route("/deleteteacher/:id").delete(teacherController.deleteTeacher);

export default router;
