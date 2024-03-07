import express from 'express'
import { getMessage, getUsersForSideBar, sendMessage } from '../../controllers/chat/message.controller.js'
import { authenticateUserToken } from '../../middlewares/authenticateUser.js'

const router = express.Router()

// router for sending message
router.post('/chat/send/:id', authenticateUserToken, sendMessage)

//route for getting messages
router.get('/chat/:id', authenticateUserToken, getMessage)
router.get('/chat', authenticateUserToken, getUsersForSideBar)

export default router
