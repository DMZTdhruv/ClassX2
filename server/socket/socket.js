// socket.js
import { Server } from 'socket.io'
import http from 'http'
import express from 'express'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: [`http://localhost:3000`],
    methods: ['GET', 'POST'],
  },
})

const users = {}

export const getSocketIdByUserId = receiverId => {
  return users[receiverId]
}

io.on('connection', socket => {
  const userId = socket.handshake.query.userId
  console.log(userId)

  if (userId) {
    users[userId] = socket.id
  }

  // active users info when they get online
  io.emit('activeUsers', Object.keys(users))

  // A user disconnects
  socket.on('disconnect', () => {
    console.log(`User ${users[userId]} got disconnected`)
    delete users[userId]
    io.emit('activeUsers', Object.keys(users))
  })
})

export { app, io, server }
