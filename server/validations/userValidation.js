// validations/userValidation.js
import { validateEmail } from "../utils/validationUtils.js";

export const validateUserSignUp = (email, password) => {
  if (!validateEmail(email)) {
    throw new Error("Invalid email format");
  }
};
