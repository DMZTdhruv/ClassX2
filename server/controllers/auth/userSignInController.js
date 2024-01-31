<<<<<<< HEAD
import User from '../../model/user/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const userSignInController = async (req, res) => {
  try {
    const { email, password } = req.body
    const userToFind = await User.findOne({ email: email })
    if (!userToFind) return res.status(404).json({ message: 'User not found' })

    const passwordMatch = bcrypt.compareSync(password, userToFind.password)

    if (!passwordMatch)
      return res.status(401).json({ message: 'Invalid credentials' })

    const user = {
      email: userToFind.email,
      userId: userToFind._id,
    }

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN)
    return res.status(200).json({ message: 'Successful logged in', accessToken: accessToken})
=======
import { signIn } from "../../services/authService.js";

export const userSignInController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await signIn(email, password);
    res.status(200).json(result);
>>>>>>> main
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
