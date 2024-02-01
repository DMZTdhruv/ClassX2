import { signIn } from "../../services/AuthService/authService.js";

export const userSignInController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await signIn(email, password);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};