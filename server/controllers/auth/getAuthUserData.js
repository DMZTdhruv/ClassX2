import { getUserDataService } from '../../services/AuthService/authService.js'

export async function getAuthUserData(req, res) {
  try {
    const { userProfileId } = req.user
    console.log('\n \n \n \n THIS IS THE USER PROFILE DATA')
    console.log(userProfileId)
    const { statusCode, response } = await getUserDataService(userProfileId)
    console.log('\n \n \n \n THIS IS THE USER PROFILE DATA')
    res.status(statusCode).json(response)
  } catch (error) {
    console.log(error.message)
    res.status(500).json(error.message)
  }
}
