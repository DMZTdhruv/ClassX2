
export const validateUserSignUp = (email, password,res) => {
  if (!email || !password) {
    return res.status(400).json({error: "Incomplete details"});
  }
};
