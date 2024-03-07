import jwt from 'jsonwebtoken'

export const authenticateUserToken = async (req, res, next) => {
  try {
    const token = req.cookies.classX_user_token || req.headers.cookies?.split('=')[1]
    if (!token) {
      return res.status(404).json({ error: 'Unauthorized' })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized - invalid token' })
      }
      req.user = user
      next()
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
