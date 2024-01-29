import express from "express"
import { userSignUpController } from "../controllers/auth.js"

const router = express.Router()

router.post("/singUp", userSignUpController)
router.get("/test" , (req,res) => {
  res.status(200).json({message: "Hello"})
})

export default router;