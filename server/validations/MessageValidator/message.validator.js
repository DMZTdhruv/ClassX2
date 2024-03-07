export const messageValidator = (message, senderId, receiverId, res) => {
  if (!message || !senderId || !receiverId) {
    return res.status(400).json({ error: 'Incomplete message details' })
  }
}
export const getMessageValidator = (senderId, receiverId, res) => {
  if (!senderId || !receiverId) {
    return res.status(400).json({ error: 'Incomplete message details' })
  }
}
