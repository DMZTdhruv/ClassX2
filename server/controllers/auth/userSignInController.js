import { signIn } from '../../services/AuthService/authService.js'

export const userSignInController = async (req, res) => {
  try {
    const { email, password } = req.body
    const result = await signIn(email, password)

    res.cookie('classX', result.authToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      path: '/',
      secure: true,
    })
    res.cookie('classX_user_token', result.token, {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      path: '/',
      secure: true,
    })
    res.status(200).json({ message: result.message })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
