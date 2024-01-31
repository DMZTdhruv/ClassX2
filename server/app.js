<<<<<<< HEAD
import mongoose from 'mongoose'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import authRouter from './routes/authRoutes.js'
import branchesRouter from './routes/branchRoutes.js'
import userProfileRouter from './routes/protected/userProfileRoutes.js'
=======
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import authRouter from "./routes/unprotected/authRoutes.js";
import branchRouter from "./routes/protected/branchRoutes.js";
import userProfileRouter from "./routes/protected/userProfileRoutes.js";
>>>>>>> main

dotenv.config()

<<<<<<< HEAD
const app = express()
const port = process.env.PORT || 3001
app.use(express.json())
app.use(morgan('common'))
app.use(helmet())
app.use(cors())
=======
const app = express();
app.use(express.json());
app.use(morgan("common"));
app.use(helmet());
app.use(cors());
>>>>>>> main

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello classX server' })
})

<<<<<<< HEAD
app.use('/auth', authRouter)
app.use('/branches', branchesRouter)
app.use('/create', userProfileRouter)
=======
app.use("/auth", authRouter);
app.use("/branches", branchRouter);
app.use("/users", userProfileRouter);
>>>>>>> main

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection

<<<<<<< HEAD
db.on('open', () => console.log('Mongodb is connected'))
db.on('error', () => console.log('Failed to create an connection with mongodb'))

app.listen(port, () =>
  console.log(`The server is running on http://localhost:${port}`)
)
=======
db.on("open", () => console.log("Mongodb is connected"));
db.on("error", () => console.log("Failed to create a connection with MongoDB"));

export default app;
>>>>>>> main
