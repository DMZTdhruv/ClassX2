export const logOutController = async (req, res) => {
  try {
    res.cookie('classX_user_token', '', { maxAge: 0 })
    res.status(200).json({ message: 'Logged out successfully' })
  } catch (error) {
    console.log(`Error in logout controller: ${error.message}`)
    res.status(500).json({ error: `Internal server error` })
  }
}
