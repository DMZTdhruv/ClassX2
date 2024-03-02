import mongoose from 'mongoose'
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
dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())
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
mongoose.connect(process.env.DB_URL)
const db = mongoose.connection

db.on('open', () => console.log('Mongodb is connected'))
db.on('error', () => console.log('Failed to create a connection with MongoDB'))

export default app
