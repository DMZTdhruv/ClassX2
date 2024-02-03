// routes/protected/branchRoutes.js
import express from "express";
import { authenticateUserToken } from "../../middlewares/authMiddleware.js";
import { createBranchController } from "../../controllers/branch/index.js";
import { getBranchController } from "../../controllers/branch/getBranchController.js";

const router = express.Router();

router.post("/create-branch", authenticateUserToken, createBranchController);
router.get("/get-branch", authenticateUserToken, getBranchController )

export default router;
