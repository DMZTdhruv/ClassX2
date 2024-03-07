import Conversation from '../../models/messages/conversation.model.js'
import Message from '../../models/messages/message.model.js'
import UserProfile from '../../models/user/userProfile.model.js'
import { getSocketIdByUserId, io } from '../../socket/socket.js'

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
    })

    if (newMessage) {
      conversation.messages.push(newMessage)
    }

    await Promise.all([conversation.save(), newMessage.save()])

    const receiverSocketId = getSocketIdByUserId(receiverId)
    if (receiverSocketId) {
      console.log(newMessage);
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

export const getMessageService = async (senderId, receiverId, res) => {
  try {
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate('messages')

    if (!conversation) {
      return res.status(200).json({ data: [] })
    }

    return res
      .status(200)
      .json({ message: 'Message received successfully', data: conversation.messages })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}
