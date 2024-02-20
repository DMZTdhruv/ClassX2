import mongoose from "mongoose";
const Schema =  mongoose.Schema;

const commentSchema = new Schema({
  postId: {
    type:Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  commentText: {
    type: String,
    required: true,
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'UserProfile',
    required: true
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'UserProfile',
  }],
  commentReplies: [{
    type: Schema.Types.ObjectId,
    ref: 'ReplyComment',
  }]
}, {timestamps: true})

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;