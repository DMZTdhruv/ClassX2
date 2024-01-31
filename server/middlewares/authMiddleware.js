// middlewares/authMiddleware.js
import jwt from "jsonwebtoken";

export const authenticateUserToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not found/expired" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: err.message });
    }
    req.user = user;
    next();
  });
};
