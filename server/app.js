import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
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

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const port = process.env.PORT || 3001

app.use(cookieParser())
app.use(express.json())
app.use(morgan('common'))
app.use(helmet())
app.use(
  cors({
    origin: ['http://localhost:8080'],
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: 'Content-Type,Authorization',
  })
)

app.set('trust')

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello classX server' })
})
app.use('/auth', authRouter)
app.use('/branches', branchRouter)
app.use('/users', userProfileRouter)
app.use('/post', postRouter)
app.use('/message', messageRouter)

connectToMongoDB()
server.listen(port, '0.0.0.0', () => {
  console.log(`Listening on port ${port}`)
})
