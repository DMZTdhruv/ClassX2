import { signIn } from '../../services/AuthService/authService.js'

export const userSignInController = async (req, res) => {
  try {
    const { email, password } = req.body
    await signIn(email, password, res)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
