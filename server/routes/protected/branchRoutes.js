// routes/protected/branchRoutes.js
import express from "express";
import { authenticateUserToken } from "../../middlewares/authenticateUser.js";
import { createBranchController } from "../../controllers/branch/index.js";
import { getBranchController } from "../../controllers/branch/getBranchController.js";
import { getSemesterNumberController } from "../../controllers/semesters/getSemesterController.js";

const router = express.Router();

router.post("/create-branch", authenticateUserToken, createBranchController);
router.get("/get-branch", authenticateUserToken, getBranchController )
router.get("/get-semester",authenticateUserToken,  getSemesterNumberController)
export default router;
