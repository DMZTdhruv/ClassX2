import UserProfile from '../../models/user/userProfile.model.js'
import {
  messageService,
  getMessageService,
  getTotalMessageService,
} from '../../services/MessageService/message.service.js'
import {
  getMessageValidator,
  messageValidator,
} from '../../validations/MessageValidator/message.validator.js'

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body
    const { id: receiverId } = req.params
    const senderId = req.user.userProfileId

    // checking message details
    messageValidator(message, senderId, receiverId, res)

    // creating conversation and message
    await messageService(message, senderId, receiverId, res)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getMessage = async (req, res) => {
  try {
    const { page, limit } = req.query
    console.log(req.query)
    const currentPage = parseInt(page) || 1
    const itemsPerPage = parseInt(limit) || 10
    const startIndex = (currentPage - 1) * itemsPerPage

    const { id: receiverId } = req.params
    const senderId = req.user.userProfileId

    const { statusCode, response } = await getMessageService(
      startIndex,
      itemsPerPage,
      senderId,
      receiverId
    )

    res.status(statusCode).json(response)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getTotalMessages = async (req, res) => {
  try {
    const { id: receiverId } = req.params
    const senderId = req.user.userProfileId

    const { statusCode, response } = await getTotalMessageService(senderId, receiverId)

    res.status(statusCode).json(response)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getUsersForSideBar = async (req, res) => {
  const { userProfileId } = req.user
  try {
    const user = await UserProfile.findById(userProfileId)
    // if (user.chatIds.length === 0) {
    const followingUsers = await UserProfile.find({
      _id: { $in: user.following },
    }).select('username userProfileImage lastActiveOn')
    console.log(followingUsers)
    return res.status(200).json({
      message: 'Follow some users or send messages to start conversation',
      data: followingUsers,
    })
    // }

    // const chatIdUsers = await UserProfile.find(
    //   _id: { $in: user.chatIds },
    // }).select('username userProfileImage')
    // console.log(chatIdUsers)

    // res.status(200).json({ data: chatIdUsers })
  } catch (error) {
    res.status(500).json({ error: error.message })
    console.log(`Error in chat controller: ${error.message}`)
  }
}
