import mongoose from "mongoose";

//removed userID because mongoose will generate by itself
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    userProfile: { type: mongoose.Schema.Types.ObjectId, ref: "UserProfile" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
