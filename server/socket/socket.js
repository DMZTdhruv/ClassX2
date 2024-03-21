// socket.js
import { Server } from 'socket.io'
import http from 'http'
import express from 'express'
import UserProfile from '../models/user/userProfile.model.js'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: [
      `http://localhost:3000`,
      `https://classx2client-production.up.railway.app`,
    ],
    methods: ['GET', 'POST'],
  },
})

const users = {}

export const getSocketIdByUserId = receiverId => {
  return users[receiverId]
}

io.on('connection', socket => {
  const userId = socket.handshake.query.userId
  console.log(`${userId} : Is connected`)

  if (userId) {
    users[userId] = socket.id
  }

  socket.on('typing-message', (senderId, receiverId, currentStatus) => {
    socket
      .to(users[receiverId])
      .emit('typingStarted', { status: currentStatus, receiverId: senderId })
  })
  
  // active users info when they get online
  io.emit('activeUsers', Object.keys(users))

  // A user disconnects
  socket.on('disconnect', () => {
    console.log(`User ${userId} got disconnected`)
    updateActiveStatus(userId)
    delete users[userId]
    io.emit('activeUsers', Object.keys(users))
  })

  const updateActiveStatus = async userId => {
    try {
      const userProfile = await UserProfile.findById(userId)
      const lastActiveDate = new Date().toISOString()
      console.log(`${userProfile.username} was last seen active at ${lastActiveDate}`)
      userProfile.lastActiveOn = lastActiveDate
      userProfile.save()
    } catch (error) {
      console.log(error.message)
    }
  }
})

export { app, io, server }
