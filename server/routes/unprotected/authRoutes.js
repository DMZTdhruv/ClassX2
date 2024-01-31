// routes/unprotected/authRoutes.js
import express from "express";
import {
  userSignUpController,
  userSignInController,
} from "../../controllers/auth/index.js";

const router = express.Router();

router.post("/signUp", userSignUpController);
router.post("/signIn", userSignInController);

export default router;
