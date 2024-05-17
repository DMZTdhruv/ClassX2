import { app, server } from './socket/socket.js'
import express, { urlencoded } from 'express'
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
import classroomRoutes from './routes/protected/classroom.route.js'
import { getClassroomWorksService } from './services/classroom/classroom.service.js'
dotenv.config()

const port = process.env.PORT || 3001
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.json())
app.use(helmet())
app.use(morgan('dev'))
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://classxfrontend-production.up.railway.app',
      'https://classx.up.railway.app',
      'https://classx2-clientbackup.onrender.com',
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
app.use('/classroom', classroomRoutes)

connectToMongoDB()
server.listen(port, '0.0.0.0', () => console.log(`Connected`))
