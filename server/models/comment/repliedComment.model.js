import mongoose from "mongoose";
const Schema =  mongoose.Schema;

const repliedCommentSchema = new Schema({
  parentCommentId: {
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  // client is responsible for sending postedById to here.
  repliedUserId: {
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
  }]
}, {timestamps: true})

const ReplyComment = mongoose.model('ReplyComment', repliedCommentSchema);

export default ReplyComment;