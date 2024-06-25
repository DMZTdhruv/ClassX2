import express from 'express'
import {
  deleteMessage,
  getMessage,
  getTotalConversationMessages,
  getTotalMessages,
  getUsersForSideBar,
  sendMessage,
} from '../../controllers/chat/message.controller.js'
import { authenticateUserToken } from '../../middlewares/authenticateUser.js'

const router = express.Router()

// sidebar users
router.get('/chat', authenticateUserToken, getUsersForSideBar)

// router for sending message
router.post('/chat/send/:id', authenticateUserToken, sendMessage)

//route for getting messages
router.get('/chat/:id', authenticateUserToken, getMessage)
router.get('/chat/total-chat/:id', authenticateUserToken, getTotalMessages)
router.get('/chat/total-conversation-chat/:receiverId', authenticateUserToken, getTotalConversationMessages)


// delete
router.delete('/chat/:deleteId', authenticateUserToken, deleteMessage)

export default router
