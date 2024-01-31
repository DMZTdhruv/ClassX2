// config/db.js
import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("open", () => console.log("Mongodb is connected"));
db.on("error", () => console.log("Failed to create a connection with MongoDB"));

export default mongoose;
