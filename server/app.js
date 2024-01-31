import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import authRouter from "./routes/unprotected/authRoutes.js";
import branchRouter from "./routes/protected/branchRoutes.js";
import userProfileRouter from "./routes/protected/userProfileRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan("common"));
app.use(helmet());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello classX server" });
});

app.use("/auth", authRouter);
app.use("/branches", branchRouter);
app.use("/users", userProfileRouter);

mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;

db.on("open", () => console.log("Mongodb is connected"));
db.on("error", () => console.log("Failed to create a connection with MongoDB"));

export default app;
