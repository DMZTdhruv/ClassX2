import UserProfile from "../model/user/userProfile.model."

export const createUserProfileController = async (req,res) => {
  try {
    const {
      name,
      enrollmentNumber,
      branch,
      division,
      semester,
      isPrivate,
    } = req.body;
  
    if (!name || !enrollmentNumber || !branch || !division || !semester || !isPrivate)
      return res.status(404).json({message: "Didn't received all the credentials"})
    
    const newUserProfile = new UserProfile({
      name,
      enrollmentNumber,
      branch,
      division,
      semester,
      isPrivate,
    })

    const savedUSerProfile = await newUserProfile.save()
    res.status(201).json({message: "Successfully created a user", userProfile: savedUSerProfile});
  } catch (err) {
    res.status(500).json({message: err.message}) 
  }
}
