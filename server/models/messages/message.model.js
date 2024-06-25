import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserProfile',
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PostSchema',
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserProfile',
      required: true,
    },
    replyMessage: {
      replyToUsername: String,
      replyMessage: String,
    },
    message: {
      type: String,
    },
    asset: {
      originalFileName: String,
      extension: String,
      url: String,
    },
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
    },
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);
export default Message;
