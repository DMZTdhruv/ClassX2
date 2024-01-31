// utils/validationUtils.js
export const validateEmail = (email) => {
  // Your email validation logic
  // For example, use a regular expression for basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Add other validation utilities as needed
