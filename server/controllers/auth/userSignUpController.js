import { validateUserSignUp } from '../../validations/userValidation.js'
import { signUp } from '../../services/AuthService/authService.js'

export const userSignUpController = async (req, res) => {
  try {
    const { email, password } = req.body
    validateUserSignUp(email, password, res)
    await signUp(email, password, res)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
