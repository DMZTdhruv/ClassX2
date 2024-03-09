import UserProfileRepository from '../../repositories/UserProfileRepository.js'

const getUserProfileDetailsController = async (req, res) => {
  try {
    const { userId } = req.query
    console.log(req.query)
    const userProfileRepo = new UserProfileRepository()
    const userProfile = await userProfileRepo.findById(userId)
    if (!userProfile) {
      return res.status(401).json({ error: `User profile does not exists` })
    }

    return res.status(200).json({
      data: userProfile,
      message: `Fetched userprofile successfully`,
    })
  } catch (error) {
    console.log(`Error in userProfileDetails controllers: ${error.message}`)
    res.status(500).json(`Internal server error`)
  }
}

export default getUserProfileDetailsController
