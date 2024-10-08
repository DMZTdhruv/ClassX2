import mongoose from 'mongoose';

const converSationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserProfile',
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
      },
    ],
  },
  { timestamps: true }
);

const Conversation = mongoose.model('Conversation', converSationSchema);
export default Conversation;
