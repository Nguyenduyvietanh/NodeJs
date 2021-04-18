import express from "express";
const router = express.Router();
import { signup, signin, signout, checkLogin } from "../controllers/auth";
import { userSignupValidator } from "../validator/index"

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.post("/check", checkLogin);
router.get('/signout', signout);
module.exports = router;