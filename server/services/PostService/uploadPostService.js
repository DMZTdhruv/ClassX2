import PostSchema from '../../models/post/postSchema.model..js'
import UserProfile from '../../models/user/userProfile.model.js'
import { returnMessage } from '../../utils/returnMessage.js'

export const uploadPostService = async (
  userProfileId,
  attachments,
  aspectRatio,
  caption,
  location,
  category
) => {
  try {
    const isValidate = validateExperimentInput(
      userProfileId,
      attachments,
      caption,
      location,
      category
    )
    console.log(attachments)
    if (!isValidate) {
      return returnMessage(400, { error: `Incomplete details` })
    }

    const newExperiment = await PostSchema.create({
      attachments: attachments,
      aspectRatio: aspectRatio,
      caption: caption,
      location: location,
      category: category,
      postedBy: userProfileId,
    })

    const user = await UserProfile.findById(userProfileId)
    user.posts.push(newExperiment._id)
    await user.save()

    return returnMessage(200, { message: 'Successfully posted' })
  } catch (error) {
    console.log(error.message)
    throw new Error(error.message)
  }
}

const validateExperimentInput = (
  userProfileId,
  attachments,
  caption,
  location,
  category
) => {
  if (
    !userProfileId ||
    attachments.length === 0 ||
    !caption ||
    !location ||
    !category
  ) {
    return false
  }
  return true
}
