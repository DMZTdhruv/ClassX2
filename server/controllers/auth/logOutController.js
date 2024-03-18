export const logOutController = async (req, res) => {
  const token = ''
  try {
    if (process.env.NODE_ENV === 'development') {
      res.cookie('classX_user_token', token, {
        maxAge: 0,
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
      })
    } else {
      res.cookie('classX_user_token', token, {
        maxAge: 0,
        httpOnly: true,
        sameSite: 'Strict',
        domain: '.railway.app',
        secure: process.env.NODE_ENV !== 'development',
      })
    }
    res.status(200).json({ message: 'Logged out successfully' })
  } catch (error) {
    console.log(`Error in logout controller: ${error.message}`)
    res.status(500).json({ error: `Internal server error` })
  }
}
