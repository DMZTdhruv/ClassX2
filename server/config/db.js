// config/db.js
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("connected to database");
  } catch (error) {
    console.log(`Error connecting to database ${error.message}`)
  }
}

export default connectToMongoDB;