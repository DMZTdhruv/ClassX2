import jwt from "jsonwebtoken"

export const authenticateUserToken = (req,res,next) => {
  const authHeader  = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if(!token) return res.status(401).json({message: "Token not found/expired"})

  jwt.verify(token,process.env.ACCESS_TOKEN, (err,user) => {
    if(err) return res.status(401).json({message: err.message})
    req.user = user;
    next()
  })
}