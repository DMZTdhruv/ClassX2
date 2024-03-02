import { messageService, getMessageService } from '../../services/MessageService/message.service.js'
import { getMessageValidator, messageValidator } from '../../validations/MessageValidator/message.validator.js'

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
    const {id: receiverId} = req.params.id;
    const senderId = req.user.userProfileId;

    getMessageValidator(receiverId, senderId);
    await getMessageService(senderId, receiverId);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}