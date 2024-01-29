import express from "express";
import { createUserProfileController } from "../../controllers/index.js";

const router = express.Router();
router.post("/create-user-profile", createUserProfileController);

export default router;
