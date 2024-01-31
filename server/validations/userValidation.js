// validations/userValidation.js
import { validateEmail } from "../utils/validationUtils.js";

export const validateUserSignUp = (email, password) => {
  // Your validation logic
  if (!validateEmail(email)) {
    throw new Error("Invalid email format");
  }

  // Add more validations as needed
};
