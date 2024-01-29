import express from "express";
import { createBranchController } from "../controllers/index.js";

const router = express.Router();
router.post("/branch", createBranchController);

export default router;
