import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserProfile",
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserProfile',
    required: true,
  },
  message: {
    type: String,
    required: true,
  }
})

const Message = mongoose.model('Message',messageSchema);
export default Message;