// routes/protected/branchRoutes.js
import express from "express";
import { authenticateUserToken } from "../../middlewares/authMiddleware.js";
import { createBranchController } from "../../controllers/branch/index.js";

const router = express.Router();

router.post("/create-branch", authenticateUserToken, createBranchController);

export default router;
