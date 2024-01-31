// controllers/auth/userSignUpController.js
import { validateUserSignUp } from "../../validations/userValidation.js";
import { signUp } from "../../services/authService.js";

export const userSignUpController = async (req, res) => {
  try {
    const { email, password } = req.body;

    validateUserSignUp(email, password);

    const result = await signUp(email, password);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

