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

<<<<<<< HEAD
const app = express()
const server = http.createServer(app)
const io = new Server(server)

const port = process.env.PORT || 3001

=======
const port = process.env.PORT || 3001
>>>>>>> 5782d6450493d8ef2eba73bd7bc3dbad5dde7dfb
app.use(cookieParser())
app.use(express.json())
app.use(morgan('common'))
app.use(helmet())
app.use(
  cors({
<<<<<<< HEAD
    origin: ['http://localhost:8080'],
=======
    origin: [
      'http://localhost:3000',
      'https://classx2client-production.up.railway.app',
    ],
>>>>>>> 5782d6450493d8ef2eba73bd7bc3dbad5dde7dfb
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
<<<<<<< HEAD
server.listen(port, '0.0.0.0', () => {
  console.log(`Listening on port ${port}`)
})
=======
server.listen(port, '0.0.0.0', () => console.log(`Connected`))
>>>>>>> 5782d6450493d8ef2eba73bd7bc3dbad5dde7dfb
