import express from "express";
import { userProfileController } from "../controllers/index.js";

const router = express.Router();
router.post("/user-profile", userProfileController);

export default router;
