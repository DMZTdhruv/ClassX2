import mongoose from "mongoose";
const Schema =  mongoose.Schema;

const repliedCommentSchema = new Schema({
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  repliedUser: {
    type: Schema.Types.ObjectId,
    ref: 'UserProfile',
    required: true,
  },
  commentText: {
    type: String,
    required: true,
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'UserProfile',
    required: true,
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'UserProfile',
    required: true,
  }]
}, {timestamps: true})

const ReplyComment = mongoose.model('ReplyComment', repliedCommentSchema);

export default ReplyComment;