export const messageValidator = (message, senderId, receiverId, res) => {
  if (!message.message || !senderId || !receiverId) {
    return res.status(400).json({ error: 'Incomplete message details' })
  }
}
export const getMessageValidator = (senderId, receiverId, res) => {
  if (!senderId || !receiverId) {
  return {
      statusCode: 401,
      response: {
        error: `Incomplete details`,
      },
    }
  }
}
