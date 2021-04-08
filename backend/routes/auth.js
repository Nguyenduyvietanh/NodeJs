import express from "express";
const router = express.Router();
import { signup, signin } from "../controllers/auth";
import { userSignupValidator } from "../validator/index"

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
module.exports = router;