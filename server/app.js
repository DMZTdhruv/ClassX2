import { app, server } from './socket/socket.js'
import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import authRouter from './routes/unprotected/authRoutes.js'
import {
  branchRouter,
  postRouter,
  userProfileRouter,
  messageRouter,
} from './routes/protected/index.js'
import connectToMongoDB from './config/db.js'
dotenv.config()

app.use(cookieParser())
app.use(express.json())
app.use(morgan('common'))
app.use(helmet())
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://class-x-client-no2p.vercel.app',
      'https://class-x-client.vercel.app',
    ],
    credentials: true,
  })
)

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello classX server' })
})

app.use('/auth', authRouter)
app.use('/branches', branchRouter)
app.use('/users', userProfileRouter)
app.use('/post', postRouter)
app.use('/message', messageRouter)

connectToMongoDB()
server.listen(3001, () => console.log('Hello'))