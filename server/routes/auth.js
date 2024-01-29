import express from "express"
import { userSignUpController, userSingInController } from "../controllers/auth.js"

const router = express.Router()

router.post("/singUp", userSignUpController)
router.post("/singIn", userSingInController)

export default router;