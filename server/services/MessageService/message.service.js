import Conversation from '../../models/messages/conversation.model.js'
import Message from '../../models/messages/message.model.js'
import UserProfile from '../../models/user/userProfile.model.js'
import { getSocketIdByUserId, io } from '../../socket/socket.js'
import { getMessageValidator } from '../../validations/MessageValidator/message.validator.js'

export const messageService = async (message, senderId, receiverId, res) => {
  try {
    // const sender = await UserProfile.findById(senderId)
    // if (!sender.chatIds.includes(receiverId)) {
    //   sender.chatIds.push(receiverId)
    //   if (!sender.requestsId.includes(receiverId)) {
    //     sender.requestsId.remove(receiverId)
    //   }
    // }

    // const receiver = await UserProfile.findById(receiverId)
    // if (!receiver.chatIds.includes(senderId)) {
    //   receiver.requestsId.push(receiverId)
    // }

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    })

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      })
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
      conversationId: conversation._id,
    })

    if (newMessage) {
      conversation.messages.push(newMessage)
    }

    await Promise.all([conversation.save(), newMessage.save()])

    const receiverSocketId = getSocketIdByUserId(receiverId)
    if (receiverSocketId) {
      console.log(newMessage)
      io.to(receiverSocketId).emit('newMessage', newMessage)
    }

    return res
      .status(201)
      .json({ message: 'Message created successfully', data: newMessage })
  } catch (error) {
    console.log(`Error: ${error.message}`)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export const getMessageService = async (
  startIndex,
  itemsPerPage,
  senderId,
  receiverId
) => {
  try {
    getMessageValidator(senderId, receiverId)
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    })

    if (!conversation) {
      return {
        statusCode: 200,
        response: {
          message: 'Message received successfully',
          data: [],
        },
      }
    }

    const conversationMessages = await Message.find({
      conversationId: conversation._id,
    })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(itemsPerPage)

    if (!conversationMessages) {
      return {
        statusCode: 200,
        response: {
          message: 'Message received successfully',
          data: [],
        },
      }
    }

    return {
      statusCode: 200,
      response: {
        message: 'Message received successfully',
        data: conversationMessages.reverse(),
      },
    }
  } catch (error) {
    console.log(error.message)
    return {
      statusCode: 500,
      response: {
        error: `Internal server error`,
      },
    }
  }
}

export const getTotalMessageService = async (senderId, receiverId) => {
  try {
    getMessageValidator(senderId, receiverId)
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    })

    if (!conversation) {
      return {
        statusCode: 200,
        response: {
          message: 'Message received successfully',
          data: 0,
        },
      }
    }

    const totalConversationMessages = await Message.find({
      conversationId: conversation._id,
    }).countDocuments({})

    return {
      statusCode: 200,
      response: {
        message: 'Message received successfully',
        data: totalConversationMessages,
      },
    }
  } catch (error) {
    console.log(error.message)
    return {
      statusCode: 500,
      response: {
        error: `Internal server error`,
      },
    }
  }
}
