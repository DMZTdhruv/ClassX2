import Conversation from '../../models/messages/conversation.model.js'
import Message from '../../models/messages/message.model.js'

export const messageService = async (message, senderId, receiverId, res) => {
  try {
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
    return res.status(201).json({ message: 'Message created successfully' })
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

    return res.status(200).json({ data: conversation.messages })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}
